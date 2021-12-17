Hello!

For using this application, use these commands:
Build:
`npm run build`

Test:
`npm run test`

Lint:
`npm run lint`

Start:
`npm run start`

The endpoint is only:
`/convert/{imageName}/{width}/{height}`
That will take the image in the parameter imageName, and if is located in the ./images/full folder the application will convert it to smaller images and put into the ./images/converted folder using the width/specified, and also serving the image to the client browser.

It is expected that if the output image already exists, that the endpoint will not recreat it.
Also, if the source image does not exists, it is expected to show an error 500.
