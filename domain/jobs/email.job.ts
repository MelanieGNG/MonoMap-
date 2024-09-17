import cron from 'node-cron';
import { MonoModel } from '../../src/data/models/mono.model';
import { EmailService } from '../services/email.service';
import { generateMonoCaseEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async ()=>{
        try {
            const monoCases = await MonoModel.find({ isEmailSent: false });
            
            if (!monoCases.length){
                console.log("No hay incidentes por enviar")
                return;
            }

            console.log(`Procesando ${monoCases.length} monoCases.`)
            await Promise.all(
                monoCases.map(async (monoCase)=>{
                    console.log(monoCase)
                    try{
                        const htmlBody = generateMonoCaseEmailTemplate(
                            monoCase.lat,
                            monoCase.lng,
                            monoCase.genre,
                            monoCase.age,
                            monoCase.creationDate
                        )

                        await emailService.sendEmail({
                            to:"lanyng17@gmail.com",
                            subject:`Nuevo Caso de Viruela del Mono en México (${monoCase.creationDate})`,
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el caso con Id: ${monoCase._id}`);
                        let updateCase = {
                            lat: monoCase.lat,
                            lng: monoCase.lng,
                            genre: monoCase.genre,
                            age: monoCase.age,
                            creationDate: monoCase.creationDate,
                            isEmailSent: true
                        };
                        await MonoModel.findByIdAndUpdate(monoCase._id,updateCase);
                        console.log(`Caso actualizado para el Id: ${monoCase._id}`);
                    }
                    catch(error){
                        console.error("Error al procesar el caso");
                    }
                })
            );
        } catch (error) {
            console.error("Error durante el envio de correo")
        }
    });
}