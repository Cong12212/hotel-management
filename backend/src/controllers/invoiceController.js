const QueryHelper = require('../utils/QueryHelper')
const Invoice = require('../models/Invoice')
const Booking = require('../models/Booking')
const mongoose = require('mongoose')
/**
 * @API_endpoint example :POST http://localhost:4000/api/invoices
 * @param {req.body = bookingId} req.body = bookingId 
 * @return {success status, data(invoice created)}
 * 
 */
const checkoutInvoice = async(req,res)=>{

    const session = await mongoose.startSession()

    try{
        const {bookingId} = req.body 
        if(!bookingId){
            return res.status(404).json({
                success: false,
                error: "BookingId is required"
            })
        }
        const existingBooking = await Booking.findById(bookingId).session(session)
        if(!existingBooking)
        {
            return res.status(404).json({
                success: false,
                error: "Booking not found"
            })
        }
        if(!["confirmed","pending"].includes(existingBooking.status))
        {
            return res.status(404).json({
                success: false,
                error: "Booking already processed"
            })
        }

        session.startTransaction()

        existingBooking.status = "completed"
        await existingBooking.save({session})

        const invoice = new Invoice({bookingId: bookingId,totalAmount: existingBooking.totalAmount})
        await invoice.save({session})


        await session.commitTransaction()
        session.endSession()
        
        const populatedInvoice = await invoice.populate({
            path: 'bookingId',
            select: 'customerIds userId bookingDetails',
            populate: [
                {
                    path: 'customerIds',
                    select: 'fullName idNumber phone address'
                },
                {
                    path: 'userId',
                    select: 'fullName phone role'
                },
                {
                    path: 'bookingDetails'
                }
            ]
        })

        return res.status(201).json({
            success: true,
            data: populatedInvoice
        })

    }catch(err)
    {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        session.endSession();

        console.error('Transaction failed:', err);

        return res.status(500).json({
            success: false,
            error: "Transaction failed"
        })

    }
}

/**
 * @api_endpoint example :GET http://localhost:4000/api/invoices
 * @param {sort, page, limit, search}
 * @returns {success status, total page, count, data}
 */
const getAllInvoices = async(req,res)=>{

    const {search} = req.query 

    const total = await Invoice.countDocuments()
    const invoiceQuery = Invoice.find().populate({
        path: 'bookingId',
        select: 'customerIds userId bookingDetails',
        populate: [
            {
                path: 'customerIds',
                select: 'fullName idNumber phone address '
            },
            {
                path: 'userId',
                select: 'fullName phone role'
            },
            {
                path: 'bookingDetails',
                populate: {
                    path: 'roomId',
                    select: '_id roomName'
                }
            }             


        ]
    })
    const queryHelper = new QueryHelper(invoiceQuery, req.query).executeQuery()

    let invoices = await queryHelper.query 

    // Handle search by roomName
    if (search){
        const searchTerm = search.toLowerCase()
        invoices = invoices.filter(invoice=>{
            if(invoice.bookingId.bookingDetails)
            {
                return invoice.bookingId.bookingDetails.some(bookingDetail=>{
                    if(bookingDetail.roomId && bookingDetail.roomId.roomName)
                    {
                        return bookingDetail.roomId.roomName.toLowerCase().includes(searchTerm)
                    }
                })
            }
            return false

        })
    }


    return res.status(200).json({
        success: true,
        total,
        count: invoices.length,
        data: invoices,

    })
    
}
module.exports = {checkoutInvoice,getAllInvoices}