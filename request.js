if (!window.XMLHttpRequest)
	console.log('Error: browser does not support modern ajax')

function Request()
{	
	var that = this
	this.request = new XMLHttpRequest()
    this._data = null
    this._contentType = null

    this.get = function(url) {
        ajax('GET', url)
        return this
    }
    this.post = function(url) {
        ajax('POST', url)
        return this
    }
    this.put = function(url) {
        ajax('PUT', url)
        return this
    }
    this.delete = function(url) {
        ajax('DELETE', url)
        return this
    }

    this.header = function(name, value) {
        request.setRequestHeader(name, value)
        return this
    }
    // application/json
    this.contentType = function(_contentType) {
        return this.header('Content-Type', _contentType)
    }
    this.send = function(_data) {
		if (_data)
			this._data = data
        this.request.send(this._data)
    }
	this.succeeded = function(onSucceeded) {
		_onSucceeded = onSucceeded
		return this
	}
	this.failed = function(onFailed) {
		_onFailed = onFailed
		return this
	}

    var ajax = function(method, url, json) {
        that.request.open(method, url, true)
        that.request.onreadystatechange = function () {
			console.log('ready state:'+that.request.readyState + ', status:'+that.request.status)
            if (that.request.readyState == 4) {
				var response = new Response(that.request)
				if (that.request.status != 200)
					_onFailed(response)
				else
					_onSucceeded(response)
			}
        }
    }
	var _onFailed = function(response) {
		console.log('ajax failed')
	}
	var _onSucceeded = function(response) {
		console.log('ajax succeeded')
	}
}

function Response(request)
{
	var STATUS = {
		"200": "OK",
		"201": "Created",
		"204": "No Content",
		"400": "Bad Request",
		"401": "Unauthorized",
		"403": "Forbidden",
		"404": "Not Found",
		"405": "Method Not Allowed",
		"500": "Server Error",
		"503": "Service Unavailable"
	}
	this.status = {
		"number": request.status,
		"text": STATUS[request.status.toString()]
	}
	this.body = request.response
	this.succeeded = this.status.number >= 200 && this.status.number < 300
	this.failed = !this.succeeded
	this.header = {"text": request.getAllResponseHeaders()}
	var headers = this.header.text.split('\r\n')
	for (var i = 0; i < headers.length; i++) {
		var colon = headers[i].indexOf(':')
		var name = headers[i].substring(0, colon)
		var value = headers[i].substring(colon+1, headers[i].length)
		if (value[0] == ' ') // remove leading space
			value = value.substring(1, value.length)
		this.header[name] = value
	}
}