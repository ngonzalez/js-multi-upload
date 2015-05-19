# jQuery Dynamic File Upload

Example:
```javascript
        <input type="file" id="Filedata" name="Filedata[]" accept="image/*" multiple />

        <script type="text/javascript">
            $(document).ready(function() {
                $("#Filedata").change(function(e) {
                    send_file({
                        input_id: $(e.target).attr("id"),
                        url: <%= upload_path.to_json %>,
                        type: "POST",
                        extensions: [ '.jpg', '.gif', '.png' ],
                        set_params: function(result, data, file, callback) {
                            data.append('Filedata', file);
                            console.log(result); // data:image/jpeg;base64 ..
                            callback();
                        },
                        no_files: function() {
                            console.log('no files provided');
                        },
                        complete: function() {
                            console.log('all files uploaded successfully');
                        },
                        progress: function(options) {
                            console.log('uploading: ' + options.counter + '/' + options.total_files)
                        }
                    });
                });
            })
        </script>

```
