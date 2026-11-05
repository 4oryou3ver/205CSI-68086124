type User = {
  email: string;
  password: string;
  name: string;
  role: string;
  other: string;
};

const users: User[] = [
  {
    email: "admin@company.com",
    password: "pass",
    name: "Alice",
    role: "admin",
    other: "...",
  },
  {
    email: "user@company.com", // แก้ไขอีเมลไม่ให้ซ้ำกัน
    password: "pass",
    name: "Aurora",
    role: "user",
    other: "...",
  },
  {
    email: "manager@company.com", // แก้ไขอีเมลไม่ให้ซ้ำกัน
    password: "pass",
    name: "Chloe ",
    role: "manager",
    other: "...",
  },
];

export type Credential = {
  token: string;
  email: string;
  name: string;
  role: string;
};

export const login = (email: string, pass: string): Promise<Credential | string> => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        // ปิดการสุ่มพังด้วยการคอมเมนต์ if-else นี้ออก หรือเลือกให้คืนค่าสำเร็จเสมอ
        // if (Math.random() <= 0.8) {
          // find user by email, pass
          const user = users.find(
            (u) => u.email === email && u.password === pass,
          );
          // user not found
          if (user === undefined) {
            reject("user not found");
            return;
          }
          // user found
          const newCredential: Credential = {
            token: crypto.randomUUID(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
          
          resolve(newCredential);
        // } else {
        //   reject("connection refused");
        // }
      },
      1000 + Math.random() * 2000,
    );
  });
};

export const logout = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, 500);
  });
};