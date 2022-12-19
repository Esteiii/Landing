
export class SimpleraMesage {
    static async send (
        orgId, contactEmail, contactName, contactMessage
    ) {
        // first try to create json
        try {
            const msgToSend = JSON.stringify({contactEmail: contactEmail, contactName: contactName, contactMessage: contactMessage})

            const response = await fetch("https://api.util.simplera.cl/api/contactInfo/v1/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'orgId': orgId
                },
                body: msgToSend,
            });

            if (response.status === 200 || response.status === 201) {
                return "OK"
            } else {
                throw Error(`Error al enviar mensaje: ${response.statusText}`)
            }
        } catch (error) {
            throw Error(`Error al enviar mensaje: ${error}`)
        }
        
    }

}