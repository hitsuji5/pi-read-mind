pi-read-mind is a node.js application running on Raspberry pi which provides Rest API for controlling a led and a camera.

## REST API
#### Control LED according to the mood input
* URL: <PI-IP-ADDRESS>/led
* Method: PUT
* Parameters:
    * In: body
    * Required: { mood: string }
    * Description: the mood must be ("neutral", "joy", "sad", "angry", "fear", "surprise")

#### Control camera
* URL: <PI-IP-ADDRESS>/camera
* Method: POST
* Parameters: None

#### Retrieve a picture
* URL: <PI-IP-ADDRESS>/camera
* Method: GET
* Response:
    * Content: image file (jpg)

#### Read the mood from the picture taken
* URL: <PI-IP-ADDRESS>/camera/mood
* Method: GET
* Response:
    * Content:
{
    face: boolean,
    mood: string
}
    * Description: the mood must be ("neutral", "joy", "sad", "angry", "fear", "surprise")