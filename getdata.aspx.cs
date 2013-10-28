using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class getdata : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected override void Render(HtmlTextWriter writer)
    {
        Requestsenddata resulsend = new Requestsenddata();
        try
        {
            bool end = false;
            int id = -1;
            string piece = string.Empty;
            if (Request.Form["datapiece"] != null)
                piece = Request.Form["datapiece"];

            if (Request.Form["additionaldata[id]"] != null)
                try { id = Convert.ToInt32(Request.Form["additionaldata[id]"]); }
                catch { }

            if (Request.Form["endprocess"] != null)
                try { end = Convert.ToBoolean(Request.Form["endprocess"]); }
                catch { }

            using (System.IO.StreamWriter file = new System.IO.StreamWriter(System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, id.ToString() + ".txt"), true))
            {
                file.WriteLine(HttpUtility.UrlDecode(piece));
            }
            resulsend.Statesenddata = Statedata.incomplete;
            if (end)
                resulsend.Statesenddata = Statedata.ok;

        }
        catch (Exception ex)
        {
            resulsend.Statesenddata = Statedata.error;
            resulsend.Error = ex.Message;
        }
        Response.ContentType = "application/jsonrequest";
        System.Web.Script.Serialization.JavaScriptSerializer jsonSerializer
                   = new System.Web.Script.Serialization.JavaScriptSerializer();
        writer.Write(jsonSerializer.Serialize(resulsend));
    }

}
public enum Statedata { incomplete = 1, ok = 2, error = 3 }
public class Requestsenddata
{
    private Statedata statesenddata;

    public Statedata Statesenddata
    {
        get { return statesenddata; }
        set { statesenddata = value; }
    }

    private string error = string.Empty;
    public string Error
    {
        get { return error; }
        set { error = value; }
    }
}