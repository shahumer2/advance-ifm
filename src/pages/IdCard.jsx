import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image'; // Import dom-to-image library
import './QrCard.css'; // Import the CSS file
import { QR_CODE } from '../constants/utils';
import { useSelector } from 'react-redux';

const QrCard = () => {
  const { currentUser } = useSelector((state) => state?.persisted?.user);
  const { token } = currentUser;
  const { id } = useParams();
  const navigate = useNavigate();
  const qrCodeRef = useRef(null); // Reference to the QR code image element
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
  const [qrCodeSrc, setQrCodeSrc] = useState(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch(`${QR_CODE}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch QR code image');
        }

        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setQrCodeSrc(reader.result);
          setQrCodeLoaded(true);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error fetching QR code image:', error);
      }
    };

    fetchQRCode();
  }, [id, token]);

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

        // Calculate center position for the image
        const imgWidth = 400; // Width of your QR card in pixels
        const imgHeight = 200; // Height of your QR card in pixels
        const marginHorizontal = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
        const marginVertical = 20;

        // Add the captured image to the PDF, centered
        pdf.addImage(dataUrl, 'PNG', marginHorizontal, marginVertical, imgWidth, imgHeight);

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
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '70vh' }}>
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
            gap: '10px',
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
            {qrCodeSrc ? (
              <img ref={qrCodeRef} src={qrCodeSrc} alt="QR Code" style={{ width: '90px', height: '130px' }} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="description" style={{ gridColumn: 'span 4', fontSize: '11px', marginLeft: '130px' }}>
            Advancer IFM provides innovation-driven, data-led and people-powered integrated facility management and workforce solutions for commercial, industrial, residential, healthcare & hospitality sectors.
          </div>
        </div>
      </div>
      <div className="mt-3 text-center">
        <button className="btn btn-primary mx-2" onClick={handleDownloadPDF}>Print</button>
        <button className="btn btn-primary mx-2" onClick={handleGoBack}>Go back</button>
      </div>

      {/* Print-specific CSS */}
      <style type="text/css">
        {`
          @media print {
            #qr-card {
              width: 100%;
              height: auto;
              margin: 0 auto; /* Center the card horizontally */
            }
            .hide-on-print {
              display: none; /* Hide the buttons when printing */
            }
            .container {
              display: none; /* Hide the buttons container when printing */
            }
          }
        `}
      </style>
    </>
  );
};

export default QrCard;
