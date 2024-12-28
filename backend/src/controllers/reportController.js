const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');
const Booking = require('../models/Booking');

/**
 * API endpoint example : GET http://localhost:4000/api/reports?time=12-2024
 * Required roles : admin,manager
 * @param {req.query = time} 
 */
exports.generateMonthlyReport = async (req, res) => {
    try {
        const {time} = req.query 

        const [month,year] = time.split('-').map(Number)

        if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
            return res.status(404).json({ success: false, error: 'Invalid year or month format' });
        }

        const startDate = new Date(year, month - 1, 1); 
        const endDate = new Date(year, month, 0);

        const invoices = await Invoice.aggregate([

            {
                $lookup: {
                    from: 'bookings',
                    localField: 'bookingId',
                    foreignField: '_id',
                    as: 'booking'
                }
            },
            {
                $unwind: '$booking' 
            },
        
            {
                $lookup: {
                    from: 'bookingdetails',
                    localField: 'booking.bookingDetails',
                    foreignField: '_id',
                    as: 'booking.bookingDetails'
                }
            },
        
            {
                $match: {
                    'booking.createdAt': {  
                        $gte: startDate, 
                        $lte: endDate
                    }
                }
            },
        
            {
                $project: {
                    _id: 1,
                    totalAmount: 1,
                    'booking.createdAt': 1,
                    'booking.customerIds': 1,
                    'booking.totalAmount': 1
                }
            },
                    {
                $project: {
                    createdAt: {
                        $dateToString: {
                            format: "%Y-%m-%d", 
                            date: "$booking.createdAt"
                        }
                    },
                    totalAmount: 1,
                    'booking.customerIds': 1,
                    'booking.totalAmount': 1
                }
            },
        
            {
                $group: {
                    _id: '$createdAt', 
                    totalBookings: { $sum: 1 }, 
                    totalAmount: { $sum: '$totalAmount' } 
                }
            },
        
            {
                $sort: {
                    _id: 1  
                }
            },
        
            {
                $group: {
                    _id: null,  
                    totalBookings: { $sum: '$totalBookings' },  
                    totalAmount: { $sum: '$totalAmount' }, 
                    dailyData: { $push: {  
                        date: '$_id',
                        totalAmount: '$totalAmount',
                        totalBookings: '$totalBookings'
                    }}
                }
            },
        
            {
                $project: {
                    _id: 0, 
                    totalBookings: 1,  
                    totalAmount: 1,
                    dailyData: 1 
                }
            }
        
        ]);
        
        
        const newCustomer = await Customer.find({
            'createdAt': {
                $gte: startDate, 
                $lte: endDate
            }
        })

        const totalNewCustomer = newCustomer.length

        res.status(200).json({
            success: true,
            data: {...invoices[0],totalNewCustomer}
        });
    } catch (error) {
        console.error('Error while processing report :',error)
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

