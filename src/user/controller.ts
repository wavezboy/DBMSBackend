import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { createToken, verifyToken } from "../utils/jwt";
import verifyEmailTemplate from "../utils/templates/verifyEmail";
import sendMail from "../utils/emailSender";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

const url =
  process.env.NODE_ENV === "production"
    ? "https://www.vendorsail.com"
    : "http://localhost:3001";

const signUp: RequestHandler = async (req, res) => {
  let { firstName, lastName, email, password, role } = req.body;
  email = email.toLowerCase();

  try {
    if (!firstName || !lastName || !email || !password || !role) {
      throw Error("All credentials must be included");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw Error("User already exists, login instead");
    }

    if (password.length < 8) {
      throw Error("Password must be at least 8 characters long");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        imageId: "",
        role,
        password: hashedPassword,
      },
    });

    // const token = createToken(user.id);
    // const link = `${url}/auth/verify-email?token=${token}`;

    // const data = {
    //   email: user.email,
    //   subject: "Verify your account",
    //   html: verifyEmailTemplate({ firstName: user.firstName, link }),
    // };

    // await sendMail(data);

    res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const logIn: RequestHandler = async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  try {
    if (!email || !password) {
      throw Error("All credentials must be included");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw Error("Incorrect credentials");
    }

    // if (!user.isVerified) {
    //   //   // send a link to verify email
    //   const token = createToken(user.id);
    //   const link = `${url}/auth/verify-email?token=${token}`;

    //   const data = {
    //     email: user.email,
    //     subject: "Verify your account",
    //     html: verifyEmailTemplate({ firstName: user.firstName, link }),
    //   };

    //   await sendMail(data);

    //   throw Error("Email is not verified!");
    // }

    req.session.userId = user.id;
    res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

// const verifyEmail: RequestHandler = async (req, res) => {
//   const token = req.params.token;

//   try {
//     if (!token) {
//       throw Error("no token provided to be validated");
//     }
//     const id = verifyToken(token);

//     if (!id) {
//       throw Error(
//         "The link has expired or invalid, please generate another link"
//       );
//     }

//     await prisma.user.update({
//       where: { id },
//       data: { isVerified: true },
//     });

//     res.status(200).json("Email verified successfully");
//   } catch (error: any) {
//     console.log(error);
//     res.status(400).json(error.message);
//   }
// };

// const updateImage: RequestHandler = async (req, res) => {
//   const id = req.session.userId;
//   const { image } = req.body;

//   try {
//     if (!id) {
//       throw Error("login to update your display picture");
//     }

//     if (!image) {
//       throw Error("Image is missing");
//     }

//     const user = await prisma.user.findUnique({ where: { id } });

//     if (user?.image) {
//       await cloudinaryDeleteImage(id);
//     }

//     const cloudRes = await cloudinaryUploadImage(image, id);

//     if (cloudRes?.secure_url) {
//       await prisma.user.update({
//         where: { id },
//         data: { image: cloudRes.secure_url },
//       });
//     } else {
//       throw Error("avatar upload failed");
//     }

//     const updatedUser = await prisma.user.findUnique({
//       where: { id },
//       include: {
//         vendor: {
//           include: {
//             category: true,
//             images: true,
//             languages: true,
//             location: true,
//             reviews: true,
//             socials: true,
//             requestReviews: true,
//           },
//         },
//       },
//     });

//     res.status(201).json(updatedUser);
//   } catch (error: any) {
//     console.log(error);
//     res.status(400).json(error.message);
//   }
// };

// const updateProfile: RequestHandler = async (req, res) => {
//   const id = req.session.userId;
//   const body = req.body;

//   try {
//     if (!id) {
//       throw Error("login to update your display picture");
//     }

//     await prisma.user.update({
//       where: { id },
//       data: { ...body },
//     });

//     const updatedUser = await prisma.user.findUnique({
//       where: { id },
//       include: {
//         vendor: {
//           include: {
//             category: true,
//             images: true,
//             languages: true,
//             location: true,
//             reviews: true,
//             socials: true,
//             requestReviews: true,
//           },
//         },
//       },
//     });

//     res.status(201).json(updatedUser);
//   } catch (error: any) {
//     console.log(error);
//     res.status(400).json(error.message);
//   }
// };

// const sendPasswordLink: RequestHandler = async (req, res) => {
//   const { email } = req.body;

//   try {
//     if (!email) {
//       throw Error("Email is required");
//     }

//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       throw Error("User not found!");
//     }

//     const token = createToken(user.id);
//     const link = `${url}/auth/reset-password?token=${token}`;

//     const data = {
//       email: user.email,
//       subject: "Reset Your Password",
//       html: resetPasswordEmailTemplate({ firstName: user.firstName, link }),
//     };

//     await sendMail(data);

//     res.status(200).json("Link sent successfully");
//   } catch (error: any) {
//     console.log(error);
//     res.status(400).json(error.message);
//   }
// };

// const changePassword: RequestHandler = async (req, res) => {
//   const token = req.params.token;
//   const { password } = req.body;

//   try {
//     if (!token) {
//       throw Error("no token provided to be validated");
//     }

//     if (!password) {
//       throw Error("Password is required!");
//     }

//     if (password.length < 8) {
//       throw Error("Password must be at least 8 characters long");
//     }

//     const id = verifyToken(token);

//     if (!id) {
//       throw Error(
//         "The link is expired or invalid, please generate another link"
//       );
//     }

//     const hashedPassword = await hashPassword(password);
//     await prisma.user.update({
//       where: { id },
//       data: { password: hashedPassword },
//     });

//     res.status(201).json("Password changed successfully");
//   } catch (error: any) {
//     console.log(error);
//     res.status(400).json(error.message);
//   }
// };

const autoLogin: RequestHandler = async (req, res) => {
  const userId = req.session.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw Error("User not found");
    }

    res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const logOut: RequestHandler = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    } else {
      res.status(200).json("Logout successfully");
    }
  });
};

const getUser: RequestHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    res.status(200).json(user);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

const getAllUser: RequestHandler = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});

    res.status(200).json(users);
  } catch (error: any) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export { signUp, logIn, logOut, autoLogin, getAllUser, getUser };
