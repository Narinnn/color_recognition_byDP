$(document).ready(function() {
	var dropZone = $('#upload-container');

	$('#picture').focus(function() {
		$('label').addClass('focus');
	})
	.focusout(function() {
		$('label').removeClass('focus');
	});


	dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function() {
		return false;
	});

	dropZone.on('dragover dragenter', function() {
		dropZone.addClass('dragover');
	});

	dropZone.on('dragleave', function(e) {
		let dx = e.pageX - dropZone.offset().left;
		let dy = e.pageY - dropZone.offset().top;
		if ((dx < 0) || (dx > dropZone.width()) || (dy < 0) || (dy > dropZone.height())) {
			dropZone.removeClass('dragover');
		}
	});

	dropZone.on('drop', function(e) {
		dropZone.removeClass('dragover');
		let files = e.originalEvent.dataTransfer.files;
		sendFiles(files);
	});

	$('#picture').change(function() {
		let files = this.files;
		sendFiles(files);
	});

    function getTarget(data) {
        if(data && data.url) {
            let $parent = $('.target-picture');
            let $result = $('.result-picture');
            
            $parent.empty();
            $result.empty();

            $parent.css('background-image', 'none');
            $result.css('background-image', 'none');

            let img = document.createElement('img');
            let gif = document.createElement('img');

            img.src = data.url;
            gif.src = '/assets/preloader.gif';

            $parent.append(img);
            $result.append(gif);
        }
    }

	function sendFiles(files) {
		let formData = new FormData();
		$(files).each(function(index, file) {
			if (file.type == 'image/png' || file.type == 'image/jpeg') {
				formData.append('picture', file);
			}
        });
        
        makeRequest({ url: dropZone.attr('action'), type: dropZone.attr('method'),data: formData }, getTarget);
    }
    
    function makeRequest(request, callback) {
        request.contentType = false;
        request.processData = false;
        request.success = callback;

        $.ajax(request);
    }
})
