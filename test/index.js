const chai = require('chai');
const chaiHttp = require('chai-http');
const except = chai.expect;
const app   = require('../app');
const fs    = require('fs');
const { set } = require('../app');

chai.use(chaiHttp);

describe("API ENDPOINT TESTING", ()=>{
    it("GET Landing Page", (done)=>{
        chai.request(app).get("/api/v1/member/landing-page").end((err, res)=>{
            except(err).to.be.null
            except(res).to.have.status(200)
            except(res.body).to.be.an('object')
            except(res.body).to.have.property('hero')
            except(res.body.hero).to.have.all.keys('treasure','traveler','cities')
            except(res.body).to.have.property('mostPicked')
            except(res.body.mostPicked).to.have.an("array")
            except(res.body).to.have.property('categories')
            except(res.body.categories).to.have.an('array')
            except(res.body).to.have.property('testimonial')
            except(res.body.testimonial).to.have.an('object')
            done();
        })
    })
    it('GET Detail Page', (done)=>{
        chai.request(app).get("/api/v1/member/detail-page/5e96cbe292b97300fc902222").end((err, res)=>{
            except(err).to.be.null
            except(res).to.have.status(200)
            except(res.body).to.be.an('object');
            except(res.body).to.have.property('country')
            except(res.body).to.have.property('isPopular')
            except(res.body).to.have.property('unit')
            except(res.body).to.have.property('sumBooking')
            except(res.body).to.have.property('imageId')
            except(res.body.imageId).to.have.an("array")
            except(res.body).to.have.property('featureId')
            except(res.body.featureId).to.have.an('array')
            except(res.body).to.have.property('activityId')
            except(res.body.activityId).to.have.an('array')
            except(res.body).to.have.property('_id')
            except(res.body).to.have.property('title')
            except(res.body).to.have.property('city')
            except(res.body).to.have.property('price')
            except(res.body).to.have.property('description')
            except(res.body).to.have.property('__v')
            except(res.body).to.have.property('bank')
            except(res.body.bank).to.have.an('array')
            except(res.body).to.have.property('testimonial')
            except(res.body.testimonial).to.have.an('object')
            done();
        })
    })
    it("POST Booking Page", (done)=>{

        const image = __dirname + '/buktibayar.jpeg';
        const dataBooking = {
            image,
            itemId  : '5e96cbe292b97300fc902223',
            duration : 2, 
            bookingStartDate : '9-4-2020',
            bookingEndDate : '10-4-2020',
            firstName : 'fajar',
            lastName : 'cahyadi',
            email : 'fajar@gmail.com',
            phoneNumber : '0929852',
            accountHolder : 'fajar',
            bankFrom : 'BCA',
        }

        chai.request(app).post("/api/v1/member/booking-page")
        .set('Content-Type','application/x-www-form-urlencode')
        .field('idItem', dataBooking.itemId)
        .field('duration', dataBooking.duration)
        .field('bookingStartDate', dataBooking.bookingStartDate)
        .field('bookingEndDate', dataBooking.bookingEndDate)
        .field('firstName', dataBooking.firstName)
        .field('lastName', dataBooking.lastName)
        .field('email', dataBooking.email)
        .field('phoneNumber', dataBooking.phoneNumber)
        .field('accountHolder', dataBooking.accountHolder)
        .field('bankFrom', dataBooking.bankFrom)
        .attach('image', fs.readFileSync(dataBooking.image),'buktibayar.jpeg')
        .end((err, res)=>{
            console.log(res.body.booking)
            except(err).to.be.null
            except(res).to.have.status(200)
            except(res.body).to.have.an("object")
            except(res.body).to.have.property("message")
            except(res.body.message).to.equal('success')
            except(res.body).to.have.property('booking');
            except(res.body.booking).to.have.all.keys('payments','_id','invoice','bookingStartDate','bookingEndDate','total','itemId','memberId','__v')
            except(res.body.booking.payments).to.have.all.keys('status','proofPayment','bankFrom','accountHolder')
            except(res.body.booking.itemId).to.have.all.keys('_id','title','price','duration')
            
            done()
        })
    })
})