import QRCode from 'qrcode';


export const generateQRCode = async (
  text: string, 
  options?: QRCode.QRCodeToDataURLOptions
): Promise<string> => {
  try {
    if (!text) {
      throw new Error('Input text is required to generate a QR code.');
    }

    const defaultOptions: QRCode.QRCodeToDataURLOptions = {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    };

    const mergedOptions = { ...defaultOptions, ...options };

    const dataUrl = await QRCode.toDataURL(text, mergedOptions);
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to generate QR code'
    );
  }
};