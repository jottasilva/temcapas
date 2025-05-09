import html2canvas from "html2canvas";
import { jsPDF } from "jspdf/dist/jspdf.es.js";

const pdfExportService = {
  async generatePDF(element, customizationDetails) {
    try {
      const elementClone = element.cloneNode(true);
      const originalStyles = window.getComputedStyle(element);
      document.body.appendChild(elementClone);
      elementClone.style.position = "absolute";
      elementClone.style.left = "-9999px";
      elementClone.style.transform = "none";
      elementClone.style.border = '1px #ccc solid';
      elementClone.style.borderRadius = originalStyles.borderRadius;
      elementClone.style.boxShadow = originalStyles.boxShadow;
      const cameraElement = elementClone.querySelector(".camera");
      if (cameraElement) {
        cameraElement.style.display = "none";
      }

      const customImage = elementClone.querySelector(".custom-image");
      if (customImage) {
        customImage.style.width = `${customizationDetails.imageScale * 100}%`;
        customImage.style.height = "auto";
        customImage.style.maxWidth = "none";
        customImage.style.maxHeight = "none";
        customImage.style.objectFit = "cover";
        customImage.style.transform = `translate(${
          customizationDetails.imagePositionX || 0
        }px, ${customizationDetails.imagePositionY || 0}px)`;
      }

      const canvas = await html2canvas(elementClone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      document.body.removeChild(elementClone);

      const a4Width = 210;
      const a4Height = 297;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const deviceDimensions = this.getDeviceDimensionsInMm(
        customizationDetails.phoneModel
      );
      const xPosition = (a4Width - deviceDimensions.width) / 2;
      const yPosition = 20;

      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        xPosition,
        yPosition,
        deviceDimensions.width,
        deviceDimensions.height,
        undefined,
        "FAST"
      );

      this.addCustomizationDetails(
        pdf,
        customizationDetails,
        xPosition,
        yPosition + deviceDimensions.height + 5
      );

      return pdf.output("blob");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      throw error;
    }
  },

  addCustomizationDetails(pdf, details, x, y) {
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);

    pdf.text(`Modelo: ${details.phoneModel}`, x, y);
    pdf.text(`Tipo: ${details.caseType}`, x, y + 5);
    pdf.text(`N° Capinha: ${details.id}`, x, y + 10);
    const date = new Date().toLocaleDateString("pt-BR");
    const time = new Date().toLocaleTimeString("pt-BR");
    pdf.text(`Exportado em: ${date} às ${time}`, x, y + 15);
  },

  downloadPDF(blob, filename) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  getDeviceDimensionsInMm(phoneModel) {
    const dimensions = {
      "iPhone 15 Pro Max": { width: 77.6, height: 160.9 },
      "iPhone 15 Pro": { width: 71.0, height: 146.7 },
      "iPhone 15": { width: 71.6, height: 147.6 },
      "iPhone 14 Pro Max": { width: 77.6, height: 160.7 },
      "Samsung Galaxy S24 Ultra": { width: 79.0, height: 162.3 },
      "Samsung Galaxy S24+": { width: 75.9, height: 158.5 },
      "Samsung Galaxy S24": { width: 70.6, height: 147.0 },
      "Xiaomi 14": { width: 71.5, height: 152.8 },
    };
    return dimensions[phoneModel] || { width: 75, height: 150 };
  },
};

export default pdfExportService;
