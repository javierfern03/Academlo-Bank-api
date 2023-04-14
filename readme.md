1. preguntas porque se crea una nueva promesa cuando se va generar el token:
   const generateJwt = (id) => {
   return new Promise((resolve, reject) => {

2. como bcrypt puede conprar una contraseña no encriptada con una que si lo esta ?
   if (!(await bcrypt.compare(password, user.password))) {
   return next(new AppError('Incorrect email or password', 401));
   }

3. para que sirve esta linea de codigo:
   app.use(express.json());
