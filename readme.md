request.js
==========
Get data
```
new Request()
  .get(url)
  .succeeded(function(response) {
    console.log(response.body)
  })
  .send()
```

Post data
```
new Request()
  .post(url)
  .send(data)
```
