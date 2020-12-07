module.exports = {
    viewDashboard: (req, res)=>{
        res.render('admin/dashboard/view_dashboard',{title: "Staycation | Dashboard"})
    }
}