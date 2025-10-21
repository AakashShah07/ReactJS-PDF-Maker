import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";

export default function Invoice() {
  const printRef = React.useRef(null);

  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format date as: 01 Oct, 2025
      const formattedDate = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // Format time as: 09:52 PM
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setDateTime({ date: formattedDate, time: formattedTime });
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000); // updates every second

    return () => clearInterval(timer);
  }, []);

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

    const topMargin = 40; // reserve 40px for header

  let heightLeft = imgHeight;
  let position = 0;
  let pageNumber = 1;

  const totalPages = Math.ceil(imgHeight / pdfHeight);

  while (heightLeft > 0) {
    if (pageNumber > 1) pdf.addPage();

    // Draw the image portion
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    // Add date at top-left
    const currentDate = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    pdf.setFontSize(10);
    pdf.text(currentDate, 10, 20); // 10px from left, 20px from top

    // Add title centered at top
    pdf.setFontSize(8);
    // pdf.setFont(undefined, "base");
    pdf.text("Wakalatnama", pdfWidth / 2, 20, { align: "center" });

    // Add page number at bottom-right
    pdf.setFontSize(8);
    pdf.text(`${pageNumber}/${totalPages}`, pdfWidth - 20, pdfHeight - 10);

    heightLeft -= pdfHeight;
    position = heightLeft - imgHeight;
    pageNumber++;
  }

  pdf.save("examplepdf.pdf");
};



  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div
        ref={printRef}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl"
      >
        
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
        <div className="ml-40 mr-20">
          <div className="grid grid-cols-3 items-center  background-none mt-10 mr-30 gap-5">
            {/* Card 1 */}
            <div className="border-3 border-gray-800 shadow-sm font-extrabold">
              {" "}
              <h3 className="text-md  pr- pl-5">रु 10 /- अधिवक्ता </h3>
              <h3 className="text-md   pr- pl-5">कल्याणकारी </h3>
              <h3 className="text-md  mb-2 pr- pl-5"> टिकट</h3>
            </div>

            <div className="border-3 shadow-sm pb-8 font-extrabold">
              <h3 className="text-md   pr- pl-5">रु 2 /- कोर्ट फीस</h3>
              <h3 className="text-md  pr- pl-5">टिकट </h3>
            </div>

            {/* Card 3 */}
            <div className=" p-4 text-center ">
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between ">
                    <span>
                      सीरियल नं0 - <span className="font-bold">1234567</span>{" "}
                    </span>
                  </div>
                  <div className="flex justify-between ">
                    <span>
                      दिनांक -{" "}
                      <span className="font-bold">{dateTime.date}</span>
                    </span>
                  </div>
                  <div className="flex justify-between ">
                    <span>
                      समय - <span className="font-bold">{dateTime.time}</span>
                    </span>
                  </div>
                  <div className="flex justify-between ">
                    <span>
                      जारीकर्ता -{" "}
                      <span className="font-bold">Tech Support</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img
          src="wakalatnamalogo.jpg"
          className="mx-auto mt-10 object-contain"
        />

        <div className="mt-6 ml-20 text-justify px-5 font-bold">
          <h3 className="text-md  mb-4">न्यायालय</h3>
          <h3 className="text-md  mb-4">प्रयागराज</h3>

          <span className="mb-4">
            नम्बर<span className="font-bold ml-70 mb-4 ">मुकदमा</span>{" "}
          </span>

          <h3 className="text-md  mt-4 mb-4">सन्</h3>

          <span>
            नम्बर<span className="font-bold ml-70">इजरा</span>{" "}
          </span>

          <h3 className="text-md  mt-4">सन्</h3>

          <h3 className="text-md  mt-4 ml-50">परिवादी /मुददई/अपीलान्ट</h3>
          <h3 className="text-md  mt-4 ml-30 font-normal">बनाम्</h3>

          <h3 className="text-md  mt-4 ml-50">
            अभियुक्त/मुददालैह/रेस्पान्डेन्ट
          </h3>
        </div>

        <div className="flex w-full ">
          {/* Left Side - 70% */}
          <div className="w-[75%]  ml-20 px-5 mt-20">
            <b className="">
              <h4 className="text-md  mb-4">मैं /हम</h4>
              <h4 className="text-md  mb-4">निवासी /निवासीगण-</h4>{" "}
              <h4 className="text-md  mt-8 mb-4">
                श्री KARM CHANDRA ,Enroll No - 387/91 POR No-POR00000302 ,Mob.
                No -6391233425
              </h4>{" "}
              <h4 className="text-md  mt-15">चैम्बर/सीट- 84 KHAMBHA</h4>{" "}
            </b>
            <p className="font-normal mt-3 text-base  mb-10 leading-6">
              को उपरोक्त मुकदमे की पैरवी के लिये मेहनताना अदा करने का वचन देकर
              मैं /हम अपना वकील नियुक्त करता हूँ / करते हैं|उक्त वकील महोदय को
              मैं /हम यह अधिकार देता हूँ /देते हैं कि वह मुकदमें में मेरी ओर से
              पैरवी करें आवश्यकतानुसार सवाल पूछें ,जवाब दें और बहस करें
              ,सुलहनामा दाखिल करें ,दावा स्वीकार करें ,उठा लेवें और डिग्री

              </p>

              <p className="font-normal mt-3 text-base  mb-10 leading-6">

              प्राप्त कर जाये तो उसे जारी करावें ,डिग्री का रुपया व खर्चा
              ,हर्जाना का रुपया या किसी दूसरे तरह का रुपया व खर्चा जो अदालत से
              मुझे /हमें मिलने वाला हो वसूल करें मेरी /हमारी ओर से अदालत में
              दाखिल करें ,कोर्ट फीस व स्टाम्प देवें या वापिस लेवे रसीद ले लेवे व
              प्रमाणित करें ,नकल प्राप्त करें ,अदालत के अनुमति से मिसिल का
              मुआयना करें ,आवश्यकता होने पर मुकदमा स्थापित करावे व इसे मुकदमे के
              सम्बन्ध में दूसरे काम जो जरुरी समझें पैरवी के लिए अपनी ओर से कोई
              दूसरा वकील नियुक्त करें यदि आवश्यकता हो तो अपील या निगरानी दायर
              करें और अपील निगरानी की अदालत में पैरवी करें और यह भी वचन देता हूँ
              /देते हैं कि यदि मैं /हम पूरी फीस या खर्च न अदा करुँ /करें /तो
              वकील महोदय इस मुकदमें के सम्बन्ध में जो कुछ काम करेंगे वह सब अदालत
              में स्वयं मेरा /हमारा किया हुआ समझा जायेगा और वह सदैव ही मेरे
              /हमारे किये के समान सर्वथा मान्य होगा |
            </p>
          </div>

          <div className="w-[12%] h-[400px] border-2  flex flex-col items-center justify-center gap-0 p-0">
            <p className="rotate-270 mr-20 mt-10">अदालत</p>
            <div className="rotate-270 flex space-x-1">
              <span>मुकदमा नंo</span>
              <span className="ml-10">सन्</span>
            </div>
            <p className="rotate-270 ml-20 mb-10">बनाम्</p>
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
