import fs from 'fs';
import { stringify } from 'csv-stringify/sync';
import csv from 'csv-parser';

const products = [
    'Laptop Pro 14"', 'Smart Watch Series 5', 'Wireless Noise Cancelling Headphones',
    'Tablet Air 11"', 'Smartphone Ultra', 'Gaming Mouse RGB', 'Mechanical Keyboard',
    'Monitor 27" 4K', 'External SSD 1TB', '4K Webcam', 'Ergonomic Desk Chair',
    'Standing Desk Frame', 'USB-C Hub 7-in-1', 'Phone Case MagSafe',
    'Privacy Screen Protector', 'Laptop Cooling Stand', 'Wireless Charger Pad',
    'Bluetooth Speaker', 'Smart Home Hub', 'Fitness Tracker Band'
];

const categories = ['Electronics', 'Accessories', 'Furniture', 'Office Supplies', 'Gadgets'];
const regions = ['North America', 'Europe', 'Asia Pacific', 'South America', 'Middle East', 'Africa'];
const segments = ['Consumer', 'Corporate', 'Home Office', 'Small Business', 'Education', 'Government'];
const shipModes = ['Standard Class', 'Second Class', 'First Class', 'Same Day', 'Express'];

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateAdditionalRecords(count, existingCount) {
    const records = [];
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2025-12-31');

    for (let i = 1; i <= count; i++) {
        const orderDate = randomDate(startDate, endDate);
        const sales = Math.floor(50 + Math.random() * 2500);
        const quantity = Math.floor(1 + Math.random() * 8);
        const profit = sales * (0.08 + Math.random() * 0.35);

        records.push({
            'Order ID': `ORD-${String(existingCount + i).padStart(6, '0')}`,
            'Order Date': orderDate.toISOString().split('T')[0],
            'Ship Mode': shipModes[Math.floor(Math.random() * shipModes.length)],
            'Segment': segments[Math.floor(Math.random() * segments.length)],
            'Region': regions[Math.floor(Math.random() * regions.length)],
            'Category': categories[Math.floor(Math.random() * categories.length)],
            'Product Name': products[Math.floor(Math.random() * products.length)],
            'Sales': sales,
            'Quantity': quantity,
            'Profit': Math.floor(profit)
        });
    }
    return records;
}

async function appendRecords() {
    const filePath = './data/retail_sales.csv';

    // Read existing records to count them
    const existingRecords = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => existingRecords.push(row))
            .on('end', resolve)
            .on('error', reject);
    });

    const existingCount = existingRecords.length;
    console.log(`📊 Current records: ${existingCount}`);

    // Generate 500 additional records (or change to your desired number)
    const newRecordsCount = 4970;
    const newRecords = generateAdditionalRecords(newRecordsCount, existingCount);

    console.log(`📝 Generating ${newRecordsCount} new records...`);

    // Convert new records to CSV format
    const newCsvData = stringify(newRecords, { header: false });

    // Append to existing file
    fs.appendFileSync(filePath, newCsvData);

    console.log(`✅ Added ${newRecordsCount} new records!`);
    console.log(`📊 Total records now: ${existingCount + newRecordsCount}`);

    // Verify
    const finalRecords = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => finalRecords.push(row))
            .on('end', resolve)
            .on('error', reject);
    });

    console.log(`✅ Verification: ${finalRecords.length} total records`);
}

appendRecords().catch(console.error);