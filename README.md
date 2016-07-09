# jQuery Dynamic File Upload

Example:


```html
<input type="file" id="Filedata" name="Filedata[]" accept="image/*" multiple />
```

```javascript
(function($) {
    $(function() {
        function set_progress(value) {
            console.log('Progress: ' + value);
        }

        function display_file(item) {
            console.log(item);
        }

        $(document).ready(function() {
            $("#Filedata").change(function(e) {
                send_file({
                    input_id: "Filedata",
                    name: "upload",
                    url: "http://example.com/uploads",
                    type: "POST",
                    progress: function(item) {
                        set_progress(parseInt(item.counter / item.total_files * 100))
                        display_file(item.response);
                    }
                });
            });
        })

    });
})(jQuery);
```
