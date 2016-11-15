ImageRecognition.js 
=================
Enjoy using Image Recognition for javascript.
> It's just an API for Google Image search.

Usage:
------

```javascript
var Image = new ImageRecognition("https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/220px-President_Barack_Obama.jpg");
```
To get the result 

```javascript
window.addEventListener("recognized", function (e) {
    console.log(e.detail.result); // barack obama
});

```
Test:
-----
Image  | Result |
 ------------ | :-----------: | 
![President of the USA Barack Obama](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/220px-President_Barack_Obama.jpg)      |  <br> <br> <br> **barack obama** |
![Bill Gates](https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Bill_Gates_June_2015.jpg/220px-Bill_Gates_June_2015.jpg)      |  <br> <br> <br>  **dr bill gates**  |   
![Steve Jobs](https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Steve_Jobs_with_red_shawl_edit2.jpg/220px-Steve_Jobs_with_red_shawl_edit2.jpg)   |<br> <br> <br>  **steve jobs** |   
![Gumball Cartoon](http://i.cdn.turner.com/v5cache/CARTOON/site/Images/i79/gumball_gumball_180x180.png)| <br> <br> <br>  **amazing world of gumball gumbal**|  



Created By:
-----------
[xC0d3rZ](https://xc0d3rz.github.io)

License:
--------
jQuery-webSpeaker is released under the
[MIT license](http://www.opensource.org/licenses/MIT).


