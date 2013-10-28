/*
 * datauploader 0.0.1 - A Jquery data uploader  
 * Homepage: www.articlage.com/adrianillo/article/datauploader
 *
 * Author:      Adrianillo
 * Twitter:     @adrianillo
 * Mail:        elcorreillodeadrianillo@gmail.com
 *
 * licensed under the MIT (MIT-LICENSE.txt) 
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
jQuery.extend({
    ajaxdatauploader: function (o) {
        this.s = o;
        if (o.piedelenght != null)
            this.piedelenght = o.piedelenght;
        else
            this.piedelenght = 4000;
        this.pagerequest.page = this.pagerequest = o.pagerequest;
        this.totaldates.datas = this.datas = o.datas;
        this.senddata(o.datas);
    },
    pagerequest: { page: null },
    totaldates: { datas: null },
    datauploader: function (datapiece) {
        this.datapiece = datapiece;
        this.start = 0;
        this.end = 0;
        this.lenght = 0;
        this.endprocess = true;
        this.additionaldata = null;
    },

    senddata: function (dat) {
        var from = 0;
        var to = this.piedelenght;
        this.send(from, to, dat);
    },
    send: function (from, to, dat, r) {
        s = jQuery.extend({}, jQuery.ajaxSettings, this.s);        
        var endsimbol = dat.substring(to, to + 8).indexOf(';');
        if (endsimbol > -1)
            to = to + endsimbol;
        var piece = dat.substring(from, to);
        var datasend = new this.datauploader(encodeURIComponent(piece));
        datasend.lenght = dat.length;
        datasend.start += from;
        datasend.end = from + piece.length;
        datasend.additionaldata = this.s.additional;
        datasend.idresponse = r;
        var lenghtpiece = this.piedelenght;
        if (dat.length <= datasend.end)
            datasend.endprocess = true;
        else
            datasend.endprocess = false;

        jQuery.ajax({
            url: this.pagerequest,
            type: 'POST',
            data: datasend,
            dataType: 'json',
            success: function (data) {
                if (datasend.endprocess == false)
                    jQuery.send(datasend.end + 1, datasend.end + lenghtpiece, dat, data);
                else
                    if (s.success)
                        s.success(data, "completed");
            },
            error: function (req, status, error) {
                if (s.error)
                    s.error(req, status, error);
            }
        });
    }

});