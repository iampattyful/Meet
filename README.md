# meet_server

## Meet – Mobile dating web application (https://clsfei.link/)

*Summary*:	Meet is a mobile dating web application for users to meet other users using artificial intelligence technology to conduct face detection verification in registration. After registering an account successfully, users can view other users’ profiles based on the filtered result and send instant messaging within the private chat room only if they have liked each other.  

*Tech Stack*:	
>
- TypeScript, JavaScript, HTML, CSS, and Bootstrap for frontend development
- Node.js and Express.js for backend development
- bcrypt.js for user authentication
- Formidable for form data processing
- Socket.IO for real-time communication
- PostgreSQL for database management
- AJAX, Async Await, and RESTful API for data exchange
- Python, Knex.js, NGINX, and Certbot for server management and optimization
- AWS EC2, AWS Route 53, and AWS S3 for cloud hosting and storage
- OpenCV and Numpy for face detection verification
- Sanic for server-side Python development.  

> ### *My contribution in this project:*
>
> Please refer to [meet_face_detection_ai_model](https://github.com/iampattyful/meet_face_detection_ai_model) for artifical intelligence pre-trained model source codes.
> 
> **Artifical Intelligence Pre-trained Model**
> - deployed this python model to [Amazon EC2](https://ai.clsfei.link/) via Amazon Route 53
> - utilizing Amazon S3 service to verify the presence of human face in the image uploaded during new user enrollment process from Express server via RESTful API to this face detection model
> - modified the pre-trained model with reference to [Face detection with OpenCV and deep learning](https://pyimagesearch.com/2018/02/26/face-detection-with-opencv-and-deep-learning/) to fit our project's need
>
> **Front end development**
> * *Login/Enroll new user function:* p3/public/index.html, p3/public/index.css, p3/public/index.js, p3/public/enroll.js
> * *Filter request function:* p3/public/main.html, p3/public/filter_jorm.css, p3/public/filter_jorm.js
> * *Error-handling page:* p3/public/error.html, p3/public/error.css
>
> **Back end development**
> * *User controller and service:* p3/src/controller/userController.ts, p3/src/service/userService.ts, p3/src/guard.ts
> * *Filter controller and service:* p3/src/controller/filterController.ts, p3/src/service/filterService.ts
> * *Amazon S3 helper:* p3/src/aws.ts
> * *File-handling helper:* p3/src/helper.ts
> * *Error-handling helper:* p3/src/error.ts
>
> **Database development**
> * *Knex Seed:* p3/src/seeds/p3.ts
