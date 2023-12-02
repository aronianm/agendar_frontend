function formatAsMMDDYYYY(date) {
    let month = date.getMonth() + 1; // Month is zero-based
    let day = date.getDate();
    let year = date.getFullYear();
  
    // Ensure two-digit month and day
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
  
    // Format as "mm/dd/yyyy"
    return `${month}/${day}/${year}`;
  }
function convertUnixTimeToMMDDYYYY(unixTimestamp) {
    // Convert Unix timestamp to milliseconds
    let unixMilliseconds = unixTimestamp * 1000;
  
    // Create a new Date object using the converted timestamp
    let dateObject = new Date(unixMilliseconds);
  
    // Get month, day, and year
    let month = dateObject.getMonth() + 1; // Month is zero-based
    let day = dateObject.getDate();
    let year = dateObject.getFullYear();
  
    // Ensure two-digit month and day
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
  
    // Format as "mm/dd/yyyy"
    let formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
}

function getRandomDate() {
    const startDate = new Date('2023-12-01');
    const endDate = new Date('2024-2-31');
    // Calculate the difference in milliseconds between the start and end dates
    const difference = endDate.getTime() - startDate.getTime();
  
    // Generate a random timestamp within the range
    const randomTimestamp = startDate.getTime() + Math.random() * difference;
  
    // Create a new Date object using the random timestamp
    const randomDate = new Date(randomTimestamp);
  
    return randomDate;
  }
  
export {formatAsMMDDYYYY, convertUnixTimeToMMDDYYYY, getRandomDate}