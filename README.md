# jQuery Dynamic File Upload

Example:


```javascript
        <input type="file" id="Filedata" name="Filedata[]" accept="image/*" multiple />

        <script type="text/javascript">
            (function($) {
                $(function() {

                    function upload_files(options) {
                        send_files($.extend({
                            url: UPLOAD_URL,
                            type: "POST",
                            extensions: [ '.jpg', '.gif', '.png' ],
                            set_params: function(result, data, file, callback) {
                                data.append('Filedata', file);
                                callback();
                            },
                            complete: function() {
                                console.log('complete');
                            },
                            error: function(textStatus, errorThrown) {
                                console.log(textStatus + ": " + errorThrown);
                            },
                            progress: function(options) {
                                console.log('uploading: ' + options.counter + '/' + options.total_files)
                                console.log(options.response);
                            }
                        }, options));
                    }

                    $(document).ready(function() {
                        $("#Filedata").change(function(e) {
                            upload_files({ input_id: $(e.target).attr("id") });
                        });
                    })

                });
            })(jQuery);
        </script>
```
