# Cupweb6 -> .ICS converter
##Convert your KWT agenda to a .ics-file.

| Parameter       | Functionality                                                   |
|-----------------|-----------------------------------------------------------------|
| url             | URL to schoolagenda                                             |
| name            | Name of person, use Cupweb's notation.                          |
| week            | The week to convert                                             |
| travel-duration | How long does it take to travel to school? Allowed to be blank. |

For example:
```node main.js --url=http://bonhoeffer.cupweb6.nl --name="Meijer St" --week=6 --travel-duration=20```

# Testing
There are no tests written for this program. Use it on your own risk.

# Requirements
See `package.json` and/or run `npm install`.

# License
Copyright (c) 2016 Stephan Meijer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
