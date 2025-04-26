const categoryRoutes = require('./routes/categoryRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contents', contentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes); 