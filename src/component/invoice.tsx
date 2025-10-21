import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React from "react";

export default function Invoice() {
  const printRef = React.useRef(null);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page image
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add extra pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("examplepdf.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div
        ref={printRef}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl"
      >
        <div className="relative mb-6">
          {/* Date - left aligned */}
          <p className="text-sm">
            {new Date().toLocaleString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>

          {/* Wakalatnama - perfectly centered */}
          <p className="absolute left-1/2 top-0 transform -translate-x-1/2 text-lg font-semibold">
            Wakalatnama
          </p>
        </div>
        <div className="flex flex-col items-center mt-10">
          <p
            className="text-2xl mb-2 font-[800]
"
          >
            District Bar Association Allahabad
          </p>
        </div>

          <div className="flex flex-col items-center mt-10">
          <p
            className="text-2xl mb-2 font-[800]
"
          >
            District Bar Association Allahabad
          </p>
        </div>


          <div className="flex flex-col items-center mt-10">
          <p
            className="text-2xl mb-2 font-[800]
"
          >
            District Bar Association Allahabad
          </p>
        </div>


          <div className="flex flex-col items-center mt-10">
          <p
            className="text-2xl mb-2 font-[800]
"
          >
            District Bar Association Allahabad
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 background-none mt-10">
          {/* Card 1 */}
          <div className=" p-4 text-start ">
            <h3 className="text-md  mb-2">हस्ताक्षर</h3>
            <h3 className="text-md  mb-2">मंत्री /कोषाध्यक्ष</h3>
          </div>

          <div className=" p-4 text-start ">
            <h3 className="text-md  mb-2">अधिवक्ता का नाम KARM CHANDRA</h3>
            <h3 className="text-md  mb-2">बैठने का स्थान 84 KHAMBHA</h3>
          </div>

          {/* Card 3 */}
          <div className=" p-4 text-center ">
            <img
              src="wakalatalogo.jpg"
              className="h-24 w-48 mx-auto object-contain"
              alt="Wakalatnama Logo"
            />{" "}
          </div>

          {/* Card 4 */}
          <div className=" p-4 text-start ">
            <h3 className="text-md  mb-2">
              पंजी यन सं०-<b> 65656565</b>{" "}
            </h3>
            <h3 className="text-md  mb-2">मो ० नं0- 6391233425</h3>
          </div>
        </div>

        <hr style={{ borderTop: "2px dotted black" }} className="mt-6" />

        <div className="grid grid-cols-3 items-center  background-none mt-10">
          {/* Card 1 */}
          <div className="border rounded-lg  text-center shadow-sm">
            {" "}
            <h3 className="text-md  mb-2">हस्ताक्षर</h3>
            <h3 className="text-md  mb-2">मंत्री /कोषाध्यक्ष</h3>
          </div>

          <div className=" p-4 text-start ">
            <h3 className="text-md  mb-2">अधिवक्ता का नाम KARM CHANDRA</h3>
            <h3 className="text-md  mb-2">बैठने का स्थान 84 KHAMBHA</h3>
          </div>

          {/* Card 3 */}
          <div className=" p-4 text-center ">
            <img
              src="wakalatalogo.jpg"
              className="h-24 w-48 mx-auto object-contain"
              alt="Wakalatnama Logo"
            />{" "}
          </div>
        </div>

        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>$1,750.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (10%):</span>
              <span>$175.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>$1,925.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleDownloadPdf}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
