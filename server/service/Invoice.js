import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

export const InvoiceGenerater = async (ticketData) => {
  return new Promise((resolve, reject) => {
    try {
      const fileName = `invoice_${Date.now()}.pdf`;
      const outputDir = path.join(process.cwd(), 'tickets');

      // Ensure tickets folder exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const filePath = path.join(outputDir, fileName);
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      // ----- Invoice Content -----

      // Header
      doc.fontSize(26).text(' Movie Ticket Invoice', { align: 'center' });
      doc.moveDown(1);

      // Booking Info
      doc.fontSize(14).text(`Booking ID: ${ticketData.bookingId}`);
      doc.text(`Booked By: ${ticketData.username}`);
      doc.text(`Email: ${ticketData.email}`);
      doc.text(`Date: ${ticketData.date}`);
      doc.text(`moviename: ${ticketData.moviename}`);
      doc.text(`Slot: ${ticketData.slotTime}`);
      doc.moveDown(1);

      // Seats Table
      doc.fontSize(16).text('Seats Booked:', { underline: true });
      doc.moveDown(0.5);

      (ticketData.seatNumbers || []).forEach((seat, index) => {
        doc.fontSize(12).text(`${index + 1}. Seat: ${seat}`);
      });

      doc.moveDown(1);

      // Price Info
      doc.fontSize(16).text('Payment Details', { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(14).text(`Price per Seat: ₹${ticketData.totalAmount / ticketData.seatNumbers.length}`);
      doc.text(`Total Seats: ${ticketData.seatNumbers.length}`);
      doc.text(`Total Amount Paid: ₹${ticketData.totalAmount}`);

      // Footer
      doc.moveDown(2);
      doc.fontSize(12).text('Thank you for booking with us! ', { align: 'center' });

      // End PDF stream
      doc.end();

      // Resolve on stream finish
      stream.on('finish', () => {
        resolve({
          filePath,
          fileName,
          publicUrl: `/tickets/${fileName}`, // useful for frontend use
        });
      });

      // Handle write errors
      stream.on('error', (err) => {
        reject(err);
      });

    } catch (error) {
      reject(error);
    }
  });
};
