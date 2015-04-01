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

        this.simbols = ["%20", "%21", "%22", "%23", "%24", "%25", "%26", "%27", "%28", "%29", "%2A", "%2B", "%2C", "%2D", "%2E", "%2F", "%30", "%31", "%32", "%33", "%34", "%35", "%36", "%37", "%38", "%39", "%3A", "%3B", "%3C", "%3D", "%3E", "%3F", "%40", "%41", "%42", "%43", "%44", "%45", "%46", "%47", "%48", "%49", "%4A", "%4B", "%4C", "%4D", "%4E", "%4F", "%50", "%51", "%52", "%53", "%54", "%55", "%56", "%57", "%58", "%59", "%5A", "%5B", "%5C", "%5D", "%5E", "%5F", "%60", "%61", "%62", "%63", "%64", "%65", "%66", "%67", "%68", "%69", "%6A", "%6B", "%6C", "%6D", "%6E", "%6F", "%70", "%71", "%72", "%73", "%74", "%75", "%76", "%77", "%78", "%79", "%7A", "%7B", "%7C", "%7D", "%7E", "%7F", "%E2%82%AC", "%81", "%E2%80%9A", "%C6%92", "%E2%80%9E", "%E2%80%A6", "%E2%80%A0", "%E2%80%A1", "%CB%86", "%E2%80%B0", "%C5%A0", "%E2%80%B9", "%C5%92", "%C5%8D", "%C5%BD", "%8F", "%C2%90", "%E2%80%98", "%E2%80%99", "%E2%80%9C", "%E2%80%9D", "%E2%80%A2", "%E2%80%93", "%E2%80%94", "%CB%9C", "%E2%84", "%C5%A1", "%E2%80", "%C5%93", "%9D", "%C5%BE", "%C5%B8", "%C2%A0", "%C2%A1", "%C2%A2", "%C2%A3", "%C2%A4", "%C2%A5", "%C2%A6", "%C2%A7", "%C2%A8", "%C2%A9", "%C2%AA", "%C2%AB", "%C2%AC", "%C2%AD", "%C2%AE", "%C2%AF", "%C2%B0", "%C2%B1", "%C2%B2", "%C2%B3", "%C2%B4", "%C2%B5", "%C2%B6", "%C2%B7", "%C2%B8", "%C2%B9", "%C2%BA", "%C2%BB", "%C2%BC", "%C2%BD", "%C2%BE", "%C2%BF", "%C3%80", "%C3%81", "%C3%82", "%C3%83", "%C3%84", "%C3%85", "%C3%86", "%C3%87", "%C3%88", "%C3%89", "%C3%8A", "%C3%8B", "%C3%8C", "%C3%8D", "%C3%8E", "%C3%8F", "%C3%90", "%C3%91", "%C3%92", "%C3%93", "%C3%94", "%C3%95", "%C3%96", "%C3%97", "%C3%98", "%C3%99", "%C3%9A", "%C3%9B", "%C3%9C", "%C3%9D", "%C3%9E", "%C3%9F", "%C3%A0", "%C3%A1", "%C3%A2", "%C3%A3", "%C3%A4", "%C3%A5", "%C3%A6", "%C3%A7", "%C3%A8", "%C3%A9", "%C3%AA", "%C3%AB", "%C3%AC", "%C3%AD", "%C3%AE", "%C3%AF", "%C3%B0", "%C3%B1", "%C3%B2", "%C3%B3", "%C3%B4", "%C3%B5", "%C3%B6", "%C3%B7", "%C3%B8", "%C3%B9", "%C3%BA", "%C3%BB", "%C3%BC", "%C3%BD", "%C3%BE", "%C3%BF"];
        this.s = o;
        if (o.piedelenght != null)
            this.piedelenght = o.piedelenght;
        else
            this.piedelenght = 4000;
        this.pagerequest.page = this.pagerequest = o.pagerequest;
        if (o.encodedata) {
            this.totaldates.dates = this.dates = encodeURIComponent(o.dates);
        }
        else
        {
            this.totaldates.dates = this.dates =o.dates;
        }
        this.senddata(this.totaldates.dates);
    },
    pagerequest: { page: null },
    totaldates: { dates: null },
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

        var endsimbol = dat.substring(to - 9, to + 9);

        for (var i = 0; i < this.simbols.length; i++) {
            var w = endsimbol.indexOf(this.simbols[i])
            if (w >= 0) {
                var hm = this.simbols[i].length;
                to = to - 9 + w + hm;
                break;
            }
        }

        var piece = dat.substring(from, to);
        var datasend = new this.datauploader(piece);
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
                    jQuery.send(datasend.end, datasend.end + lenghtpiece, dat, data);
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