
export const sendCustomerDataToCompany = async (customerData: any) => {
  // Calculate total rooms for the email
  const totalRooms = customerData.rooms.reduce((sum: any, room: any) => sum + room.count, 0);
  const roomsList = customerData.rooms
    .filter((room: any) => room.count > 0)
    .map((room: any) => `${room.count} ${room.name}${room.count > 1 ? 's' : ''}`)
    .join(', ');

  // Create email content
  const subject = `New Customer Estimate Request - ${customerData.contactInfo.name}`;
  
  const emailBody = `New Customer Estimate Request

Customer Information:
- Name: ${customerData.contactInfo.name}
- Email: ${customerData.contactInfo.email}
- Mobile: ${customerData.contactInfo.mobile}
- Address: ${customerData.contactInfo.address}

Customer Preferences:
- Configuration: ${customerData.configuration}
- Package: ${customerData.packageType}
- Rooms: ${roomsList}
- Total Rooms: ${totalRooms}

Estimate Details:
- Estimated Price: ₹${customerData.estimate} L
- Base Price per Room: ₹48,000
- Package Multiplier: ${customerData.packageType === 'Luxury Lux' ? '2.5x' : '1x'}

Note: Please follow up with this customer within 24 hours.`;

  try {
    // Use mailto to open email client with pre-filled data
    const mailtoLink = `mailto:yashgiri588@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    console.log('Email client opened with customer data');
    return true;
  } catch (error) {
    console.error('Error opening email client:', error);
    return false;
  }
};
