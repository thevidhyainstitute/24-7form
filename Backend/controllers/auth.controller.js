// controllers/auth.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Service = require("../models/service.model");
const ExcelJS = require("exceljs");
const { Op } = require("sequelize");
// const moment = require("moment");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// Login function for both admin and technician
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ data: {}, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ data: {}, message: "Password is not Correct" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, "secretkey", {
      expiresIn: "1h",
    });
    user.dataValues.password = "";
    const userData = { ...user.dataValues, token };

    res.status(201).json({ data: userData, message: "Login Successfully" });
  } catch (error) {
    res.status(500).json({ data: {}, message: "Internal Server error" });
  }
};

// Change password for admin and technician
exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ data: {}, message: "User not found" });
    }

    console.log(
      user.id,
      req.user,
      user.role !== "admin" && user.id !== req.user.userId,
      "decode"
    );

    // Only admin can change password for technician
    if (user.role !== "admin" || user.dataValues.id !== req.user.userId) {
      return res.status(403).json({ data: {}, message: "Permission denied" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    user.dataValues.password = "";
    const userData = { ...user.dataValues };
    res
      .status(200)
      .json({ data: userData, message: "Password changed successfully" });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ data: {}, message: "Internal Server error" });
  }
};

// Create Technician (Admin only)
exports.createTechnician = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingTechnician = await User.findOne({ where: { email } });
    if (existingTechnician) {
      return res
        .status(400)
        .json({ data: {}, message: "Technician already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const technician = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "technician",
    });
    technician.dataValues.password = "";
    // const userData = {...technician.dataValues, token};
    // const userData = {...technician, userPassword, token};

    res
      .status(201)
      .json({ data: technician, message: "Technician created successfully" });
  } catch (error) {
    res.status(500).json({ data: {}, message: "Internal Server error" });
  }
};




// Get all service records (Admin only)


// exports.getAllServiceRecords = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 10,
//       // sortBy,
//       // order,
//       search = "",
//       startingFrom = "",    // Optional filter for starting date
//       endingTo = "",        // Optional filter for ending date
//     } = req.query;

//     let sortBy = "serialNo";
//     let order = "desc";


  
//     // Query options
//     const queryOptions = {
//       where: {
//         [Op.or]: [
//           { serialNo: { [Op.like]: `%${search}%` } },
//           { branchName: { [Op.like]: `%${search}%` } },
//           { serviceDate: { [Op.like]: `%${search}%` } },
//           { customerName: { [Op.like]: `%${search}%` } },
//           { address: { [Op.like]: `%${search}%` } },
//           { serviceTimeFrom: { [Op.like]: `%${search}%` } },
//           { serviceTimeTo: { [Op.like]: `%${search}%` } },
//           { customerFeedback: { [Op.like]: `%${search}%` } },
//           { technicianName: { [Op.like]: `%${search}%` } },
//           { userId: { [Op.like]: `%${search}%` } },
//         ],
         
//       },
//       limit: parseInt(limit), // Limit results
//       offset: (page - 1) * limit, // Pagination offset
//     };

//     // // Only add order to queryOptions if sortBy and order are provided

//     if (req.query.sortBy) {
//       sortBy = req.query.sortBy;
//     }
//     if (req.query.order) {
//       order = req.query.order;
//     }
//     if (sortBy && order) {
//       queryOptions.order = [[sortBy, order.toUpperCase()]];
//     }
//     console.log(startingFrom, endingTo, 'dateeee')

//     // if (startingFrom && endingTo) {
//     //   const startDatePlusOneDay = new Date(startingFrom);
//     //   // startDatePlusOneDay.setDate(startDatePlusOneDay.getDate() + 1);
//     //   startDatePlusOneDay.setHours(startDatePlusOneDay.getHours() + 0);
//     //   startDatePlusOneDay.setMinutes(startDatePlusOneDay.getMinutes() + 0);
//     //   const endDatePlusOneDay = new Date(endingTo);
//     //   console.log(endDatePlusOneDay, 'day')
//     //   // endDatePlusOneDay.setDate(endDatePlusOneDay.getDate() + 1);
//     //   // console.log(endDatePlusOneDay, 'day2')
//     //   // endDatePlusOneDay.setHours(endDatePlusOneDay.getHours() + 5);
//     //   // endDatePlusOneDay.setMinutes(endDatePlusOneDay.getMinutes() + 30);
//     //   // console.log(endDatePlusOneDay, 'day3')

//     //   queryOptions.where.serviceDate = {
//     //     [Op.between]: [startDatePlusOneDay, endingTo],
//     //   };
//     // }

//      // Add date filters
//     //  if (startingFrom && endingTo) {
//     //   // const startDate = new Date(startingFrom);
//     //   startDate.setHours(0, 0, 0, 0); // Ensure it starts from midnight

//     //   const endDate = new Date(endingTo);
//     //   endDate.setHours(23, 59, 59, 999); // Include the entire day of `endingTo`

//     //   queryOptions.where.createdAt = {
//     //     [Op.between]: [startDate, endDate],
//     //   };
//     // }

//     console.log(queryOptions, 'options')
//     // Fetch records
//     const { count, rows: services } = await Service.findAndCountAll(
//       queryOptions
//     );

//     // Return paginated data
//     res.status(200).json({
//       totalRecords: count,
//       totalPages: Math.ceil(count / limit),
//       currentPage: parseInt(page),
//       services,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


exports.getAllServiceRecords = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      startingFrom = "", // Optional filter for starting date
      endingTo = "",     // Optional filter for ending date
    } = req.query;

    let sortBy = "serialNo";
    let order = "desc";

    // Query options
    const queryOptions = {
      where: {
        [Op.or]: [
          { serialNo: { [Op.like]: `%${search}%` } },
          { branchName: { [Op.like]: `%${search}%` } },
          { serviceDate: { [Op.like]: `%${search}%` } },
          { customerName: { [Op.like]: `%${search}%` } },
          { address: { [Op.like]: `%${search}%` } },
          { serviceTimeFrom: { [Op.like]: `%${search}%` } },
          { serviceTimeTo: { [Op.like]: `%${search}%` } },
          { customerFeedback: { [Op.like]: `%${search}%` } },
          { technicianName: { [Op.like]: `%${search}%` } },
          { userId: { [Op.like]: `%${search}%` } },
        ],
      },
      limit: parseInt(limit), // Limit results
      offset: (page - 1) * limit, // Pagination offset
    };

    // Add sorting options
    if (req.query.sortBy) sortBy = req.query.sortBy;
    if (req.query.order) order = req.query.order;
    queryOptions.order = [[sortBy, order.toUpperCase()]];

    console.log(startingFrom, endingTo, 'dates received');

    // Add date filters if both startingFrom and endingTo are provided
    if (startingFrom && endingTo) {
      // Ensure that startingFrom and endingTo are formatted correctly as strings
      const startDate = new Date(startingFrom).toISOString().split("T")[0]; // Extract YYYY-MM-DD
      const endDate = new Date(endingTo).toISOString().split("T")[0];       // Extract YYYY-MM-DD

      queryOptions.where.serviceDate = {
        [Op.between]: [startDate, endDate],
      };
    }

    console.log(queryOptions, 'query options');

    // Fetch records
    const { count, rows: services } = await Service.findAndCountAll(queryOptions);

    // Return paginated data
    res.status(200).json({
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      services,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};











exports.getServiceDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract serviceId from the route parameter

    // Fetch the service with the specified ID
    const service = await Service.findOne({
      where: { serialNo: id }, // Match the ID
    });

    // If the service is not found, return a 404 error
    if (!service) {
      return res.status(404).json({ data: {}, message: "Service not found" });
    }

    // Return the service details
    res
      .status(200)
      .json({ data: service, message: "Service Detaisl are here" });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ data: {}, message: "Internal Server error" });
  }
};


// Adjust path as per your project structure




// exports.downloadServiceReport = async (req, res) => {
//   try {
//     const {
//       sortBy = "serialNo",  // Default sorting field
//       order = "DESC",       // Default sorting order
//       customerName = "",    // Optional filter by customer name
//       startingFrom = "",    // Optional filter for starting date
//       endingTo = "",        // Optional filter for ending date
//     } = req.query;

//     // Build query options
//     const queryOptions = {
//       where: {
//         customerName: { [Op.like]: `%${customerName}%` },  // Filter by customer name
//         ...(startingFrom && { serviceDate: { [Op.gte]: new Date(startingFrom) } }),  // Filter by starting date
//         ...(endingTo && { serviceDate: { [Op.lte]: new Date(endingTo) } }),  // Filter by ending date
//       },
//       order: [[sortBy, order.toUpperCase()]],  // Sorting based on user input
//     };

//     // Fetch filtered, sorted, and ordered service records
//     const services = await Service.findAll(queryOptions);

//     // Create a new workbook and worksheet
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Service Records");

//     // Add column headers (All fields from the Service model)
//     worksheet.columns = [
//       { header: "Serial No", key: "serialNo", width: 10 },
//       { header: "Branch Name", key: "branchName", width: 20 },
//       { header: "Service Date", key: "serviceDate", width: 20 },
//       { header: "Customer Name", key: "customerName", width: 30 },
//       { header: "Address", key: "address", width: 40 },
//       { header: "Service Time From", key: "serviceTimeFrom", width: 15 },
//       { header: "Service Time To", key: "serviceTimeTo", width: 15 },
//       { header: "Customer Feedback", key: "customerFeedback", width: 40 },
//       { header: "Technician Name", key: "technicianName", width: 20 },
//       { header: "Technician Signature", key: "technicianSignature", width: 50 },
//       { header: "Customer Signature", key: "customerSignature", width: 50 },
//       { header: "User ID", key: "userId", width: 10 },
//     ];

//     // Add data rows for each service record
//     services.forEach((service) => {
//       worksheet.addRow({
//         serialNo: service.serialNo,
//         branchName: service.branchName,
//         serviceDate: service.serviceDate,
//         customerName: service.customerName,
//         address: service.address,
//         serviceTimeFrom: service.serviceTimeFrom,
//         serviceTimeTo: service.serviceTimeTo,
//         customerFeedback: service.customerFeedback,
//         technicianName: service.technicianName,
//         technicianSignature: service.technicianSignature,
//         customerSignature: service.customerSignature,
//         userId: service.userId,
//       });
//     });

//     // Set the response headers for downloading
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=ServiceRecords.xlsx"
//     );

//     // Send the Excel file
//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (error) {
//     console.error("Error generating report:", error);
//     res.status(500).json({ message: "Failed to generate report" });
//   }
// };



exports.downloadServiceReport = async (req, res) => {
  try {
    const {
      sortBy = "serialNo",  
      order = "DESC",      
      customerName = "",    
      startingFrom = "",    
      endingTo = "",        
    } = req.query;


    const queryOptions = {
      where: {
        customerName: { [Op.like]: `%${customerName}%` }, 
      },
      order: [[sortBy, order.toUpperCase()]], 
    };

    
    if (startingFrom && endingTo) {
      const startDate = new Date(startingFrom).toISOString().split("T")[0]; 
      const endDate = new Date(endingTo).toISOString().split("T")[0];       

      queryOptions.where.serviceDate = {
        [Op.between]: [startDate, endDate],
      };
    } else if (startingFrom) {
      const startDate = new Date(startingFrom).toISOString().split("T")[0]; 
      queryOptions.where.serviceDate = { [Op.gte]: startDate };
    } else if (endingTo) {
      const endDate = new Date(endingTo).toISOString().split("T")[0]; 
      queryOptions.where.serviceDate = { [Op.lte]: endDate };
    }

    console.log(queryOptions, "query options");

    
    const services = await Service.findAll(queryOptions);

    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Service Records");

    
    worksheet.columns = [
      { header: "Serial No", key: "serialNo", width: 10 },
      { header: "Branch Name", key: "branchName", width: 20 },
      { header: "Service Date", key: "serviceDate", width: 20 },
      { header: "Customer Name", key: "customerName", width: 30 },
      { header: "Address", key: "address", width: 40 },
      { header: "Service Time From", key: "serviceTimeFrom", width: 15 },
      { header: "Service Time To", key: "serviceTimeTo", width: 15 },
      { header: "Customer Feedback", key: "customerFeedback", width: 40 },
      { header: "Technician Name", key: "technicianName", width: 20 },
      { header: "Technician Signature", key: "technicianSignature", width: 50 },
      { header: "Customer Signature", key: "customerSignature", width: 50 },
      { header: "User ID", key: "userId", width: 10 },
    ];

    
    services.forEach((service) => {
      worksheet.addRow({
        serialNo: service.serialNo,
        branchName: service.branchName,
        serviceDate: service.serviceDate,
        customerName: service.customerName,
        address: service.address,
        serviceTimeFrom: service.serviceTimeFrom,
        serviceTimeTo: service.serviceTimeTo,
        customerFeedback: service.customerFeedback,
        technicianName: service.technicianName,
        technicianSignature: service.technicianSignature,
        customerSignature: service.customerSignature,
        userId: service.userId,
      });
    });

    
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ServiceRecords.xlsx"
    );

    
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({data: {}, message: "Failed to generate report" });
  }
};





// exports.getServiceDetailsPDF = async (req, res) => {
//   try {
//     const { id } = req.params; // Extract service ID from the route parameter

//     // Fetch the service with the specified ID
//     const service = await Service.findOne({
//       where: { serialNo: id }, // Match the ID
//     });

//     // If the service is not found, return a 404 error
//     if (!service) {
//       return res.status(404).json({ data: {}, message: "Service not found" });
//     }

//     // Create a new PDF document
//     const doc = new PDFDocument({
//       size: "A4", // Set the page size to A4
//       margin: 50, // Add margin for better spacing
//     });

//     // Set response headers to download the PDF
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=ServiceDetails_${id}.pdf`
//     );

//     // Pipe the PDF document to the response
//     doc.pipe(res);

//     // Add a header with a title
//     doc.fontSize(18).font('Helvetica-Bold').text("Service Details", { align: "center" }).moveDown(2);

//     // Add service details with better formatting
//     doc.fontSize(12).font('Helvetica');

//     // Service Information Section
//     doc.text("Service Information", { underline: true }).moveDown(1);
//     doc.text(`Serial No: ${service.serialNo}`);
//     doc.text(`Branch Name: ${service.branchName}`);
//     doc.text(`Service Date: ${service.serviceDate}`);
//     doc.text(`Customer Name: ${service.customerName}`);
//     doc.text(`Address: ${service.address}`);
//     doc.moveDown(1); // Add space between sections

//     // Service Timing Section
//     doc.text("Service Time", { underline: true }).moveDown(1);
//     doc.text(`Service Time From: ${service.serviceTimeFrom}`);
//     doc.text(`Service Time To: ${service.serviceTimeTo}`);
//     doc.moveDown(1);

//     // Feedback Section
//     doc.text("Feedback", { underline: true }).moveDown(1);
//     doc.text(`Customer Feedback: ${service.customerFeedback}`);
//     doc.moveDown(2);

//     // Technician Details Section
//     doc.text("Technician Details", { underline: true }).moveDown(1);
//     doc.text(`Technician Name: ${service.technicianName}`);
//     doc.moveDown(1);

//     // Customer Signature Section
//     doc.text(`User ID: ${service.userId}`).moveDown(2);

//     // Handle base64 image data for customer photo, technician signature, and customer signature

//     // Convert Base64 to Image and Return Path
//     const convertBase64ToImage = (base64Data, filename) => {
//       if (base64Data) {
//         // Remove the base64 prefix (e.g. "data:image/jpeg;base64,")
//         const base64Image = base64Data.split(",")[1];
//         if (!base64Image) {
//           console.error("Invalid base64 image data");
//           return null;
//         }
//         const imageBuffer = Buffer.from(base64Image, "base64");

//         // Define the file path to save the image temporarily
//         const imagePath = path.join(__dirname, filename);

//         // Write the buffer to a temporary file
//         try {
//           fs.writeFileSync(imagePath, imageBuffer);
//           return imagePath;
//         } catch (error) {
//           console.error("Error writing the image file", error);
//           return null;
//         }
//       }
//       return null;
//     };

//     // Add Customer Photo if available
//     if (service.customerPhoto) {
//       const customerPhotoPath = convertBase64ToImage(service.customerPhoto, 'temp_customer_photo.jpg');
//       if (customerPhotoPath) {
//         doc.text("Customer Photo:").moveDown(1);
//         doc.image(customerPhotoPath, { width: 150 }).moveDown(5);
//         fs.unlinkSync(customerPhotoPath); // Clean up the temporary image file
//       } else {
//         console.log("Customer photo not found or invalid.");
//       }
//     }

//     // Add Technician Signature if available
//     if (service.technicianSignature) {
//       const technicianSignaturePath = convertBase64ToImage(service.technicianSignature, 'temp_technician_signature.jpg');
//       if (technicianSignaturePath) {
//         doc.addPage(); // Create a new page if the content overflows
//         doc.text("Technician Signature:").moveDown(1);
//         doc.image(technicianSignaturePath, { width: 150 }).moveDown(5);
//         fs.unlinkSync(technicianSignaturePath); // Clean up the temporary image file
//       } else {
//         console.log("Technician signature not found or invalid.");
//       }
//     }

//     // Add Customer Signature if available
//     if (service.customerSignature) {
//       const customerSignaturePath = convertBase64ToImage(service.customerSignature, 'temp_customer_signature.jpg');
//       if (customerSignaturePath) {
//         doc.text("Customer Signature:").moveDown(1);
//         doc.image(customerSignaturePath, { width: 150 }).moveDown(10);
//         fs.unlinkSync(customerSignaturePath); // Clean up the temporary image file
//       } else {
//         console.log("Customer signature not found or invalid.");
//       }
//     }

//     // Add footer with timestamp
//     doc.moveDown(2).fontSize(10).text(`Generated on: ${new Date()}`, { align: "center" });

//     // Finalize the PDF
//     doc.end();
//   } catch (error) {
//     // Handle server errors
//     console.error("Error generating PDF:", error);
//     res.status(500).json({ data: {}, message: "Internal Server error" });
//   }
// };





exports.getServiceDetailsPDF = async (req, res) => {
  try {
    const { id } = req.params; // Extract service ID from the route parameter

    // Fetch the service with the specified ID
    const service = await Service.findOne({
      where: { serialNo: id }, // Match the ID
    });

    // If the service is not found, return a 404 error
    if (!service) {
      return res.status(404).json({ data: {}, message: "Service not found" });
    }

    // Create a new PDF document
    const doc = new PDFDocument({
      size: "A4", // Set the page size to A4
      margin: 50, // Add margin for better spacing
    });

    // Set response headers to download the PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ServiceDetails_${id}.pdf`
    );

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add 24x7 Logo
    // const logoPath = path.join(__dirname, "public", "24x7-pestControl.png"); // Path to the logo file
    const logoPath = path.resolve(__dirname, "../public/24x7-pestControl.png");

    console.log(logoPath, 'path')
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 30, { width: 100 }); // Position the logo (x: 50, y: 30) and set width
    }

    // Add a header with a title
    doc
      .fontSize(18)
      .font("Helvetica-Bold")
      .text("Service Details", { align: "center" })
      .moveDown(2);

    // Add service details with better formatting
    doc.fontSize(12).font("Helvetica");

    // Service Information Section
    doc.text("Service Information", { underline: true }).moveDown(1);
    doc.text(`Serial No: ${service.serialNo}`);
    doc.text(`Branch Name: ${service.branchName}`);
    doc.text(`Service Date: ${service.serviceDate}`);
    doc.text(`Customer Name: ${service.customerName}`);
    doc.text(`Address: ${service.address}`);
    doc.moveDown(1); // Add space between sections

    // Service Timing Section
    doc.text("Service Time", { underline: true }).moveDown(1);
    doc.text(`Service Time From: ${service.serviceTimeFrom}`);
    doc.text(`Service Time To: ${service.serviceTimeTo}`);
    doc.moveDown(1);

    // Feedback Section
    doc.text("Feedback", { underline: true }).moveDown(1);
    doc.text(`Customer Feedback: ${service.customerFeedback}`);
    doc.moveDown(2);

    // Technician Details Section
    doc.text("Technician Details", { underline: true }).moveDown(1);
    doc.text(`Technician Name: ${service.technicianName}`);
    doc.moveDown(1);

    // Customer Signature Section
    doc.text(`User ID: ${service.userId}`).moveDown(2);

    // Add Customer Photo, Technician Signature, and Customer Signature if available
    const convertBase64ToImage = (base64Data, filename) => {
      if (base64Data) {
        const base64Image = base64Data.split(",")[1];
        if (!base64Image) {
          console.error("Invalid base64 image data");
          return null;
        }
        const imageBuffer = Buffer.from(base64Image, "base64");
        const imagePath = path.join(__dirname, filename);
        try {
          fs.writeFileSync(imagePath, imageBuffer);
          return imagePath;
        } catch (error) {
          console.error("Error writing the image file", error);
          return null;
        }
      }
      return null;
    };

    if (service.customerPhoto) {
      const customerPhotoPath = convertBase64ToImage(service.customerPhoto, "temp_customer_photo.jpg");
      if (customerPhotoPath) {
        doc.text("Customer Photo:").moveDown(1);
        doc.image(customerPhotoPath, { width: 150 }).moveDown(5);
        fs.unlinkSync(customerPhotoPath);
      } else {
        console.log("Customer photo not found or invalid.");
      }
    }

    if (service.technicianSignature) {
      const technicianSignaturePath = convertBase64ToImage(service.technicianSignature, "temp_technician_signature.jpg");
      if (technicianSignaturePath) {
        doc.addPage();
        doc.text("Technician Signature:").moveDown(1);
        doc.image(technicianSignaturePath, { width: 150 }).moveDown(5);
        fs.unlinkSync(technicianSignaturePath);
      } else {
        console.log("Technician signature not found or invalid.");
      }
    }

    if (service.customerSignature) {
      const customerSignaturePath = convertBase64ToImage(service.customerSignature, "temp_customer_signature.jpg");
      if (customerSignaturePath) {
        doc.text("Customer Signature:").moveDown(1);
        doc.image(customerSignaturePath, { width: 150 }).moveDown(10);
        fs.unlinkSync(customerSignaturePath);
      } else {
        console.log("Customer signature not found or invalid.");
      }
    }

    // Add footer with timestamp
    doc.moveDown(2).fontSize(10).text(`Generated on: ${new Date()}`, { align: "center" });

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ data: {}, message: "Internal Server error" });
  }
};






exports.getAllTechnicians = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "id",
      order = "desc",
    } = req.query;

    // Query options
    const queryOptions = {
      where: {
        role: "technician", // Ensure only technicians are fetched
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
        ],
      },
      limit: parseInt(limit), // Limit results
      offset: (parseInt(page) - 1) * parseInt(limit), // Pagination offset
      order: [[sortBy, order.toUpperCase()]], // Sorting options
    };

    // Fetch records
    const { count, rows: technicians } = await User.findAndCountAll(queryOptions);

    // Return paginated data
    res.status(200).json({
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      technicians,
    });
  } catch (error) {
    console.error("Error fetching technicians:", error);
    res.status(500).json({ message: "Server error" });
  }
};










    

   

   
    

exports.getTechnicianDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract serviceId from the route parameter

    // Fetch the service with the specified ID
    const service = await User.findOne({
      where: { id: id }, // Match the ID
    });

    // If the service is not found, return a 404 error
    if (!service) {
      return res.status(404).json({ data: {}, message: "Technician not found" });
    }

    // Return the service details
    res
      .status(200)
      .json({ data: service, message: "Technician Details are here" });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ data: {}, message: "Internal Server error" });
  }
};