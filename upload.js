
/*

    jQuery Dynamic File Upload

    Usage:

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
                        progress: function(counter, total_files) {
                            console.log('uploading: ' + counter + '/' + total_files)
                        }
                    });
                });
            })
        </script>

*/

(function($) {
    $(function() {

        window[ 'send_file' ] = function(options) {

            var control = $("#" + options.input_id);

            var files = document.getElementById(options.input_id).files;

            function post_data(data, callback) {
                $.ajax({
                    url: options.url,
                    type: options.type,
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function(data, textStatus, jqXHR) {
                        callback();
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        options.error();
                    }
                });
            }

            if (!options.counter) options.counter = 0;

            if (options.progress) options.progress({ counter: options.counter, total_files: files.length });

            if (options.counter < files.length) {

                var file = files[options.counter];

                options.counter++;

                var data = new FormData();
                var file_type = file.name.replace(/^.*\./, '').toLowerCase();
                var reader = new FileReader();

                reader.onload = (function(f) {
                    return function(e) {
                        options.set_params(e.target.result, data, file, function() {
                            if (!options.extensions || $.inArray(file_type, options.extensions)) {
                                post_data(data, function() {
                                    send_file(options);
                                });
                            } else if (options.complete) {
                                options.complete();
                            }
                        });
                    };
                })(file);

                reader.readAsDataURL(file);

            } else {

                if (options.no_files && files.length == 0) {
                    options.no_files();
                    return;
                }

                if (window.navigator.userAgent.indexOf("MSIE") > 0) {
                    setTimeout(function() {
                        control.replaceWith(control = control.clone(true));
                    }, 1000);
                } else {
                    control.val('');
                }

                if (options.progress) options.progress({ counter: files.length, total_files: files.length });

                if (options.complete) options.complete();

            }
        }

    });
})(jQuery);