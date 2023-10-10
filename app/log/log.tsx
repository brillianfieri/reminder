const Log = async (message:string) => {

    const log = await fetch('/api/log/add/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        message: message
        }),
    })
  }
export default Log