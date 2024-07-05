import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image'; // Import dom-to-image library
import './QrCard.css'; // Import the CSS file

const QrCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const qrCodeRef = useRef(null); // Reference to the QR code image element
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);

  useEffect(() => {
    const qrCodeImg = qrCodeRef.current;

    if (qrCodeImg) {
      if (!qrCodeImg.complete) {
        qrCodeImg.onload = () => {
          setQrCodeLoaded(true);
        };
        qrCodeImg.onerror = (error) => {
          console.error('Error loading QR code image:', error);
        };
      } else {
        setQrCodeLoaded(true);
      }
    }
  }, [id]);

  const handleDownloadPDF = async () => {
    const input = document.getElementById('qr-card');

    if (!qrCodeLoaded) {
      console.error('QR code image not loaded yet.');
      return;
    }

    // Use dom-to-image to capture the card as a base64-encoded PNG
    domtoimage.toPng(input)
      .then((dataUrl) => {
        // Initialize jsPDF
        const pdf = new jsPDF('portrait', 'px', 'a4');

        // Add the captured image to the PDF
        pdf.addImage(dataUrl, 'PNG', 0, 0);

        // Download the PDF
        pdf.save('qr-card.pdf');
      })
      .catch((error) => {
        console.error('Error creating PDF:', error);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div
        id="qr-card"
        className="qrcard text-dark qr-card"
        style={{
          width: '500px',
          height: '290px',
          background: '#D7B442',
          backgroundImage: 'url("/path/to/your/local/image.jpg")',
          backgroundSize: 'cover',
          borderRadius: '15px',
          padding: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          fontFamily: 'Arial, sans-serif',
          display: 'grid',
          gridTemplateColumns: '1fr 1px 2fr 1fr',
          alignItems: 'center',
          gap: '10px',
          margin:"20px"
        }}
      >
        <div className="logo d-flex justify-content-center align-items-center">
          <img src="/images/STIE.png" alt="Logo" style={{ width: '70px', height: '60px' }} />
        </div>
        <div className="vertical-line" style={{ width: '1px', height: '160px', backgroundColor: '#000' }}></div>
        <div className="services d-flex justify-content-center" style={{ width: '160px' }}>
          <div>
            <p style={{ margin: '0', fontSize: '17px', fontWeight: 'bold', color: "#800000" }}>SECURITY</p>
            <p style={{ margin: '0', fontSize: '17px', fontWeight: 'bold', color: "#800000" }}>CLEANING</p>
            <p style={{ margin: '0', fontSize: '17px', fontWeight: 'bold', color: "#800000" }}>STEWARDING</p>
            <p style={{ margin: '0', fontSize: '17px', fontWeight: 'bold', color: "#800000" }}>FUMIGATION</p>
            <p style={{ margin: '0', fontSize: '17px', fontWeight: 'bold', color: "#800000" }}>LANDSCAPE</p>
            <p style={{ margin: '0', fontSize: '17px', fontWeight: 'bold', color: "#800000" }}>PESTCONTROL</p>
          </div>
        </div>
        <div className="qr d-flex justify-content-center align-items-center">
          <img ref={qrCodeRef} src={`http://localhost:8089/profile/qrcode/${id}`} alt="QR Code" style={{ width: '90px', height: '130px' }} />
        </div>
        <div className="description" style={{ gridColumn: 'span 4', fontSize: '11px', marginLeft: '130px' }}>
          Advancer IFM provides innovation-driven, data-led and people-powered integrated facility management and workforce solutions for commercial, industrial, residential, healthcare & hospitality sectors.
        </div>
      </div>
      <div style={{ margin: '20px', gap: '20px' }} className="mt-12 hide-on-print">
        <button style={{ marginRight: '20px' }} className="btn btn-primary" onClick={handleDownloadPDF}>Print</button>
        <button style={{ width: '90px' }} className="btn btn-primary" onClick={handleGoBack}>Go back</button>
      </div>
    </>
  );
};

export default QrCard;
