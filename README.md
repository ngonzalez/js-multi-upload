# jQuery Dynamic File Upload

Example:


```html
<input type="file" id="Filedata" name="Filedata[]" multiple />
```

```javascript
(function($) {
    $(function() {
        $(document).ready(function() {
            $('#Filedata').change(function(e) {
                $(e.target).sendFilesProxy('send', {
                    name: 'upload', // File Param Name
                    url: 'http://example.com/uploads',
                    type: 'POST',
                    progress: function(response) {
                      // Called after each file upload,
                    },
                    complete: function() {
                      // Called when all files are uploaded
                    }
                });
            });
        })
    });
})(jQuery);
```
