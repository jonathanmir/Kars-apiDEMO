import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { AppDataSource } from "../../data-source";
import "dotenv/config";

export const forgotPasswordService = async (email: string) => {
  try {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const resetToken = generateResetToken();

    const forgotPass = {
      ...user,
      resetToken: resetToken,
      resetTokenExpiration: new Date(Date.now() + 3600000),
    };

    await userRepository.save(forgotPass);

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Redefinir senha",
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <meta charset="UTF-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta name="x-apple-disable-message-reformatting" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta content="telephone=no" name="format-detection" />
          <title></title>
          <!--[if (mso 16)]>
            <style type="text/css">
              a {
                text-decoration: none;
              }
            </style>
          <![endif]-->
          <!--[if gte mso 9
            ]><style>
              sup {
                font-size: 100% !important;
              }
            </style><!
          [endif]-->
          <!--[if gte mso 9]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG></o:AllowPNG>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          <![endif]-->
        </head>
      
        <body>
          <div class="es-wrapper-color">
            <!--[if gte mso 9]>
              <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                <v:fill type="tile" color="#fafafa"></v:fill>
              </v:background>
            <![endif]-->
            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td class="esd-email-paddings" valign="top">
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      class="es-content esd-header-popover"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td class="es-adaptive esd-stripe" align="center">
                            <table
                              class="es-content-body"
                              style="background-color: transparent"
                              width="600"
                              cellspacing="0"
                              cellpadding="0"
                              bgcolor="#ffffff"
                              align="center"
                            >
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      class="es-header"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td class="es-adaptive esd-stripe" align="center">
                            <table
                              class="es-header-body"
                              style="background-color: transparent"
                              width="600"
                              cellspacing="0"
                              cellpadding="0"
                              bgcolor="transparent"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="esd-structure es-p20t es-p20b es-p20r es-p20l"
                                    style="background-color: transparent"
                                    bgcolor="transparent"
                                    align="left"
                                  >
                                    <!--[if mso]><table width="560" cellpadding="0" 
                              cellspacing="0"><tr><td width="270" valign="top"><![endif]-->
                                    <table
                                      class="es-left"
                                      cellspacing="0"
                                      cellpadding="0"
                                      align="left"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="es-m-p20b esd-container-frame"
                                            width="270"
                                            align="left"
                                          >
                                            <table
                                              width="100%"
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    align="center"
                                                    class="esd-block-image"
                                                    style="font-size: 0"
                                                  >
                                                    <a target="_blank"
                                                      ><img
                                                        class="adapt-img esdev-empty-img"
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKp_pk4918StIcjrqZ2sq8zgAWgQIXBH7n_g&usqp=CAU"
                                                        alt
                                                        width="100%"
                                                        height="100"
                                                        style="display: none"
                                                    /></a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if mso]></td><td width="20"></td><td width="270" valign="top"><![endif]-->
                                    <table
                                      class="es-right"
                                      cellspacing="0"
                                      cellpadding="0"
                                      align="right"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="esd-container-frame"
                                            width="270"
                                            align="left"
                                          >
                                            <table
                                              width="100%"
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="esd-block-button es-p10t es-m-txt-c"
                                                    align="right"
                                                  >
                                                    <span
                                                      class="es-button-border msohide"
                                                      ><a
                                                        href="https://viewstripo.email/"
                                                        class="es-button"
                                                        target="_blank"
                                                        >Try free class</a
                                                      ></span
                                                    >
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      class="es-content"
                      cellspacing="0"
                      cellpadding="0"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="esd-stripe"
                            style="background-color: #fafafa"
                            bgcolor="#fafafa"
                            align="center"
                          >
                            <table
                              class="es-content-body"
                              style="background-color: #ffffff"
                              width="600"
                              cellspacing="0"
                              cellpadding="0"
                              bgcolor="#ffffff"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="esd-structure es-p40t es-p20r es-p20l"
                                    style="
                                      background-color: transparent;
                                      background-position: left top;
                                    "
                                    bgcolor="transparent"
                                    align="left"
                                  >
                                    <table
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="esd-container-frame"
                                            width="560"
                                            valign="top"
                                            align="center"
                                          >
                                            <table
                                              style="background-position: left top"
                                              width="100%"
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="esd-block-image es-p5t es-p5b"
                                                    align="center"
                                                    style="font-size: 0"
                                                  >
                                                    <a target="_blank"
                                                      ><img
                                                        src="https://sibrok.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png"
                                                        alt
                                                        style="display: block"
                                                        width="175"
                                                    /></a>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    class="esd-block-text es-p15t es-p15b"
                                                    align="center"
                                                  >
                                                    <h1
                                                      style="
                                                        color: #333333;
                                                        font-size: 20px;
                                                      "
                                                    >
                                                      <strong>ESQUECEU SUA </strong>
                                                    </h1>
                                                    <h1
                                                      style="
                                                        color: #333333;
                                                        font-size: 20px;
                                                      "
                                                    >
                                                      <strong>&nbsp;SENHA?</strong>
                                                    </h1>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    class="esd-block-text es-p40r es-p40l"
                                                    align="left"
                                                  >
                                                    <p style="text-align: center">
                                                      HI, ${user.name}
                                                    </p>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    class="esd-block-text es-p35r es-p40l"
                                                    align="left"
                                                  >
                                                    <p style="text-align: center">
                                                      Houve um pedido de alteração sua
                                                      senha!
                                                    </p>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    class="esd-block-text es-p25t es-p40r es-p40l"
                                                    align="center"
                                                  >
                                                    <p>
                                                      Se não fez este pedido, apenas
                                                      ignore este e-mail. Caso
                                                      contrário, clique no botão
                                                      abaixo para alterar o seu senha:
                                                    </p>
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td
                                                    class="esd-block-button es-p40t es-p40b es-p10r es-p10l"
                                                    align="center"
                                                  >
                                                    <span
                                                      class="es-button-border msohide"
                                                      ><a
                                                        style="
                                                        color: white;
                                                        background-color: blue;
                                                        text-decoration: none;
                                                        padding: 8px 14px;
                                                        border: 1px solid blue;
                                                        border-radius: 32px;
                                                        "
                                                        href="http://localhost:3001/reset/${resetToken}"
                                                        target="_blank"
                                                        >RECUPERAR SENHA</a
                                                      ></span
                                                    >
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="esd-structure es-p5t es-p20b es-p20r es-p20l"
                                    style="background-position: left top"
                                    align="left"
                                  >
                                    <table
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="esd-container-frame"
                                            width="560"
                                            valign="top"
                                            align="center"
                                          >
                                            <table
                                              width="100%"
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    class="esd-block-text"
                                                    esd-links-color="#666666"
                                                    align="center"
                                                  >
                                                    <p style="font-size: 14px">
                                                      Contato:
                                                      <a
                                                        target="_blank"
                                                        href="mailto:your@mail.com"
                                                        style="
                                                          font-size: 14px;
                                                          color: #666666;
                                                        "
                                                        >grupo12kars@outlook.com</a
                                                      >
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      class="es-footer"
                      cellspacing="0"
                      cellpadding="0"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="esd-stripe"
                            style="background-color: #fafafa"
                            bgcolor="#fafafa"
                            align="center"
                          >
                            <table
                              class="es-footer-body"
                              style="background-color: transparent"
                              width="600"
                              cellspacing="0"
                              cellpadding="0"
                              bgcolor="transparent"
                              align="center"
                            >
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      class="es-content esd-footer-popover"
                      cellspacing="0"
                      cellpadding="0"
                      align="center"
                    >
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </body>
      </html>
      `,
    });

    return "E-mail de recuperação de senha enviado.";
  } catch (error) {
    console.error(error);
    throw new AppError("Erro ao processar a solicitação.");
  }
};

function generateResetToken(): string {
  const resetToken = uuidv4();
  return resetToken;
}
