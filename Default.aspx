<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<title>Página sin título</title>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="js/ajaxdatauploader.js" type="text/javascript"></script>
<script>

    function aditionaldata() {
        this.id = 0;
        this.des = "";
    }
    
    function sendData() {
        var aditional = new aditionaldata();
        aditional.id = 1;
        aditional.des = "This is the optional parameter description  to send to  the server";
        jQuery.ajaxdatauploader(
        {
            additional: aditional,
            dates: document.getElementById("datatosend").value,
            pagerequest: "getdata.aspx",
            piecelenght: 4000,
            encodedata: true,
            success: function (datauploader, status) {

                if (status)
                    if (status == "completed")
                        alert('Data sent successfully!!.');

            },
            error: function (req, status, error) {
                alert('There was an error in sending data!!.');

            }
        });
    }
</script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
        <div>
            <textarea id="datatosend" rows="10" style="width: 500px; height: 450;">Write what you want to send to the server, you can write as much as you want.</textarea>
        </div>
        <input style="height: 40px;" value="Mandar Datos" type="button" onclick="sendData();" />
    </div>
    </form>
</body>
</html>

