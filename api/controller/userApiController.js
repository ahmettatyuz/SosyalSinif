const User = require("../models/userModel");
const Todo = require("../models/todoModel");

const bcrypt = require("bcrypt");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const multer = require("multer");
const upload = multer({ dest: "./public/profileImages" });
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');

const ogrencileriGetir = async (req, res, next) => {
    try {
        const ogrenciler = await User.find({ role: "ogrenci" }, { todo: 0 });
        res.json(ogrenciler);
    } catch (err) {
        next(err);
        // res.status(404).json({
        //     mesaj: err + " Kullanıcılar getirilemedi.",
        // });
    }
}

const ogretmenleriGetir = async (req, res, next) => {
    try {
        const ogretmenler = await User.find({ role: "ogretmen" }, { todo: 0 });
        res.json(ogretmenler);
    } catch (err) {
        next(err);
        // res.status(404).json({
        //     mesaj: err + " Kullanıcılar getirilemedi.",
        // });
    }
}

const kullaniciGetir = async (req, res, next) => {
    try {
        const kullanici = await User.findById(req.params.id, { todo: 0 });
        res.json(kullanici);
    } catch (err) {
        next(err);
        // res.status(404).json({
        //     mesaj: err + " Kullanıcı bulunamadı.",
        // });
    }
}

const noOlustur = function () {
    const tarih = new Date();
    return tarih.getFullYear().toString() + (tarih.getMonth() + 1).toString() + tarih.getDay().toString() + tarih.getHours().toString() + tarih.getMinutes().toString() + tarih.getSeconds().toString();
}

const kullaniciEkle = async (req, res, next) => {
    try {
        req.body.no = noOlustur();
        const eklenecekUser = new User(req.body);
        const { error, value } = eklenecekUser.joiValidation(req.body);
        if (error) {
            next(error);
        } else {
            eklenecekUser.parola = await bcrypt.hash(eklenecekUser.parola, 8);
            const sonuc = eklenecekUser.save()
                .then(result => res.json(
                    { mesaj: "Kayıt başarılı !", status: 202 }
                ))
                .catch(err => {
                    next(err);
                    // res.status(404).json("Kullanıcı Eklenemedi !");
                });
        }
    }
    catch (err) {
        next(err);
        // res.status(404).json({
        //     mesaj:"Kullanıcı eklenemedi "+err
        // })
    }
}

const generateToken = async (user) => {
    return await jwt.sign({ id: user.id, no: user.no, role: user.role, email: user.email, ad: user.ad, soyad: user.soyad, profileImage: user.profileImage }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });
}

const kullaniciGiris = async (req, res, next) => {
    try {
        // console.log(req.body);
        const user = await User.findOne({ email: req.body.email }, { todo: 0, faceId: 0 });
        console.log("user " + user);
        if (user == null || user == undefined) {
            throw createError(404, "Email veya parola hatalı !");
        }

        const parolaKontrol = await bcrypt.compare(req.body.parola, user.parola);
        if (!parolaKontrol) {
            throw createError(404, "Email veya parola hatalı !");
        } else {
            const token = await generateToken(user);
            res.cookie("token", token, {
                maxAge: 1000 * 60 * 60 * 2
            });
            req.userSession = user;
            res.json({
                mesaj: "Giriş Başarılı ! Yönlendiriliyorsunuz..."
            });
        }
    }
    catch (err) {
        next(err);
    }

}

const faceIdileGiris = async (req, res, next) => {
    const user = await User.findById(req.body.id, { todo: 0 });
    const token = await generateToken(user);
    res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 2
    });
    req.userSession = user;
    res.json({
        mesaj: "Giriş Başarılı ! Yönlendiriliyorsunuz..."
    });
}

const kullaniciSil = (req, res, next) => {

}

const kodGonder = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // E-posta sağlayıcınızı burada belirtin, örneğin 'Gmail' veya 'SMTP'
                auth: {
                    user: process.env.SENDER_EMAIL, // Gönderen e-posta adresi
                    pass: process.env.SENDER_PASSWORD // Gönderen e-posta hesabının şifresi
                }
            });

            // E-posta ayarlarını ve içeriğini belirleyin
            const mailOptions = {
                from: process.env.SENDER_EMAIL, // Gönderen e-posta adresi
                to: req.body.email, // Alıcı e-posta adresi
                subject: 'Doğrulama Kodu', // E-posta konusu
                html: `<div style="border-radius: 10px; padding:10px;font-size:20px;text-align: center;">
                <img src="https://i.imgur.com/uPf4M5s.png" alt="" width="250px"> <br>
                <b style="color: #3F72AF;">Sosyal Sınıf</b> tarafından gönderilen doğrulama kodu: <h4 style="color:#3F72AF">${req.body.code}</h4>Bu kodu kimseyle paylaşmayınız.
              </div>`
            };

            // E-postayı gönderin
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log("kod gönderilemedi"),
                        res.json({
                            mesaj: "E-posta gönderilemedi",
                            status: 404
                        });
                } else {
                    console.log("kod epostanıza gönderildi"),
                        res.json({
                            mesaj: "Kod e-postanıza gönderildi.",
                            status: 200
                        });
                }
            });
        } else {
            res.json({
                mesaj: "Kullanıcı bulunamadı",
                status: 404
            });
        }

    } catch (err) {
        next(err);
    }
}

const kullaniciGuncelle = async (req, res, next) => {
    try {
        // console.log(req.body);

        // console.log("güncelleme");
        if (req.body.parola) {
            const user = await User.findById(req.params.id);
            const parolaKontrol = await bcrypt.compare(req.body.mevcutparola, user.parola);
            if (parolaKontrol) {
                if (req.body.parola == req.body.parola2) {
                    const hashPassword = await bcrypt.hash(req.body.parola, 8);
                    const sonuc = await User.updateOne({ _id: req.params.id }, { parola: hashPassword });
                    if (sonuc) {
                        res.json({
                            mesaj: "Parola değiştirildi !"
                        })
                    } else {
                        throw createError(404, "Parola değiştirilemedi !");
                    }

                } else {
                    throw createError(404, "Parolalar Eşleşmiyor !");
                }
            } else {
                throw createError(404, "Mevcut Parola Yanlış !");
            }
        }
        else if (req.file) {
            const sonuc = await User.updateOne({ _id: req.params.id }, { profileImage: req.file.path.split("public")[1] });
            if (sonuc) {
                res.json({
                    mesaj: "Yeni Profil Resmi Kaydedildiyor..."
                })
            }
        }
        else {
            const { error, value } = User.joiValidationForUpdate(req.body);
            if (error) {
                throw createError(404, error)
            } else {
                const sonuc = await User.updateOne({ _id: req.params.id }, req.body);
                const user = await User.findById(req.params.id);
                if (sonuc) {
                    const token = await generateToken(user);
                    res.cookie("token", token, {
                        maxAge: 1000 * 60 * 60 * 2
                    });
                    res.json({
                        mesaj: "Değişiklikler Kaydedildi !"
                    })
                } else {
                    throw createError(404, "Değişiklikler Kaydedilemedi !");
                }
            }
        }
    } catch (err) {
        next(err);
    }

}

const parolaDegistir = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        user.parola = await bcrypt.hash(req.body.parola1, 8);
        console.log(req.body.parola1);
        const result = await user.save();
        if (result._id) {
            res.json({
                mesaj: "Parolanız değiştirildi",
                status: 200,
            });
        } else {
            res.json({
                mesaj: "Parola değiştirilemedi",
                status: 404
            });
        }
    } catch (err) {
        next(err);
    }
}


const todoListGetir = async (req, res, next) => {
    try {
        const todoList = await User.findById(req.userSession.id, { todo: 1, _id: 0 }).populate("todo");
        // console.log(todoList);
        res.json(todoList.todo);
    } catch (err) {
        next(err);
    }
}

const todoEkle = async (req, res, next) => {
    try {
        const id = req.userSession.id;
        const objId = new mongoose.Types.ObjectId(id);
        const eklenecekTodo = new Todo(req.body);
        const { error, value } = eklenecekTodo.joiValidation(req.body);
        if (error) {
            next(error);
        } else {
            const eklenen = await eklenecekTodo.save();
            // console.log(eklenen);
            const user = await User.findById(id);
            user.todo.push(eklenen._id);
            const sonuc = await user.save();
            if (sonuc) {
                res.json({
                    status: 202,
                    mesaj: "Görev ekleniyor..."
                });
            } else {
                res.json({
                    status: 404,
                    mesaj: "Görev eklenemedi."
                });
            }
        }

    } catch (err) {
        next(err);
    }
}

const todoGuncelle = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.body.id);
        todo.status = req.body.status;
        const sonuc = await todo.save();
        if (sonuc) {
            res.json({
                mesaj: "Görev güncellendi."
            })
        }


    } catch (err) {
        next(err);
    }
}

const todoSil = async (req, res, next) => {
    try {
        const sonuc = await Todo.findByIdAndDelete(req.params.id);
        if (sonuc) {
            res.json({
                mesaj: "Görev siliniyor..."
            })
        }
    } catch (err) {
        next(err);
    }
}

const faceIdGet = async (req, res, next) => {
    try {
        const faceId = await User.find({ faceId: { $exists: true } }, { faceId: 1 });
        res.json(faceId);
    } catch (err) {
        next(err);
    }

}

const faceIdPost = async (req, res, next) => {
    try {
        const id = req.userSession.id;
        const faceId = req.body.faceId;
        const user = await User.findById(id);
        // console.log("req.body:");
        // console.log(req.body);
        user.faceId = faceId;
        await user.save();
        res.json({
            status: 202,
            mesaj: "Yüz tanıma bilgileri başarıyla kaydedildi."
        });
    } catch (err) {
        next(err);
    }


}

const bildirimleriGetir = async (req, res, next) => {
    try {
        const result = await User.findById(req.userSession.id, { notifications: 1 }).populate("notifications");
        res.json(result.notifications);
    } catch (err) {
        next(err);
    }
}


const bildirimleriKaldir = async (req, res, next) => {
    // bu metod kullanıcı ders veya sınıfa girdiğinde çalışır.
    try {
        console.log("bildirimleri kaldir calisti");
        console.log(req.userSession);
        const user = await User.findById(req.userSession.id, { notifications: 1 }).populate("notifications");
        const sinifid = req.params.sinifid;
        console.log(sinifid);
        user.notifications = user.notifications.filter(bildirim => bildirim.sinifid != sinifid);
        console.log(user);
        await user.save();
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    ogrencileriGetir,
    ogretmenleriGetir,
    kullaniciGetir,
    kullaniciEkle,
    kullaniciGiris,
    kullaniciGuncelle,
    todoListGetir,
    todoEkle,
    todoGuncelle,
    todoSil,
    faceIdGet,
    faceIdPost,
    faceIdileGiris,
    bildirimleriGetir,
    bildirimleriKaldir,
    kodGonder,
    parolaDegistir
}