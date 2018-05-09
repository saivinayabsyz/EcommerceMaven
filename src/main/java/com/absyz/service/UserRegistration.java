package main.java.com.absyz.service;

import java.io.*;
import java.io.InputStream;
import javax.servlet.http.*;
import javax.servlet.http.Part;
import java.sql.*;
import javax.servlet.*;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
 
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import main.java.com.absyz.core.DbConnection;

import java.sql.*;
@MultipartConfig(maxFileSize = 16177215)
public class UserRegistration {
	public static String user_reg(HttpServletRequest request)
	{
		Connection conn =null;
		PreparedStatement psInsert = null;
		FileInputStream fis = null;
		ResultSet rsUserReg = null;
		ResultSet rsUserMax = null;
		Statement stSelectQuery = null;
		Statement stSelectMax = null;
		String strEmail = request.getParameter("email");
		String strQuery = "Select * from users where email = '"+strEmail+"'";
		String strUserQuery = "Select max(userid) userid from users";
		System.out.println(strQuery);
		String strOutput="";
		int intUserId=0;
		JSONArray json = new JSONArray();
		JSONObject obj = new JSONObject();
		try {
			conn = DbConnection.getConnection();
			stSelectQuery = conn.createStatement();
			rsUserReg = stSelectQuery.executeQuery(strQuery);
			System.out.println(rsUserReg.toString());
			if(rsUserReg.next())
			{
				
				System.out.println(rsUserReg.getString("firstname"));
			}
			if(!rsUserReg.next())
			{
				stSelectMax = conn.createStatement();
				rsUserMax = stSelectMax.executeQuery(strUserQuery);
				if(rsUserMax.next())
				{
					intUserId = rsUserMax.getInt("userid")+1;
				}
				System.out.println("Inside");
				String strFname = request.getParameter("fname");
				String strlname = request.getParameter("lname");
				String strAddress1 = request.getParameter("address1");
				String strAddress2 = request.getParameter("address2");
				String strCity = request.getParameter("city");
				String strState = request.getParameter("state");
				String strCountry = request.getParameter("country");
				String strZipcode = request.getParameter("zipcode");
				String strMobile = request.getParameter("mobile");
				String strPassword = request.getParameter("password");
				//String strUsername = request.getParameter("ema");
				//String strDob = request.getParameter("dob");
				String strGender = request.getParameter("gender");
				 //Part filePart = request.getPart("image");
				File file = new File("WebContent/images/dell_laptop.jpg");
 fis =  new FileInputStream(file);

				
				

				psInsert = conn.prepareStatement("Insert into users(username,firstname,lastname,email,password,mobile,address1,address2,city,state,country,"
						+ "zipcode,gender) values(?,?,?,?,?,?,?,?,?,?,?,?,?)");
				psInsert.setString(1, strEmail);
				psInsert.setString(2, strFname);
				psInsert.setString(3, strlname);
				psInsert.setString(4, strEmail);
				psInsert.setString(5, strPassword);
				psInsert.setString(6, strMobile);
				psInsert.setString(7, strAddress1);
				psInsert.setString(8, strAddress2);
				psInsert.setString(9, strCity);
				psInsert.setString(10, strState);
				psInsert.setString(11, strCountry);
				psInsert.setString(12, strZipcode);
				psInsert.setString(13, strGender);
				
                               // fis.close();
				System.out.println(psInsert.toString());
				psInsert.executeUpdate();
				obj.put("success","success");
			}
			else
			{
				System.out.println("Inside else part");
				obj.put("success","failure");
				obj.put("message", "User Already Available");
				
			}
					
   	} catch (IOException | SQLException e) {
			// TODO Auto-generated catch block
			try {
				obj.put("success","failure");
				obj.put("message", "Check All input parameters");
			} catch (JSONException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		json.put(obj);
		System.out.println(json.toString());
		return json.toString();
	}
	public static String change_password(HttpServletRequest request)
	{
		Connection conn =null;
		PreparedStatement psUpdate = null;
		String strUpdate="";
		String strPwd = request.getParameter("pwd");
		int intUserid = Integer.parseInt(request.getParameter("userid"));
		JSONArray json = new JSONArray();
		JSONObject obj = new JSONObject();
		conn = DbConnection.getConnection();
		strUpdate = "Update users set password = '"+strPwd+"' where userid = "+intUserid;
		try {
			psUpdate = conn.prepareStatement(strUpdate);
			psUpdate.executeUpdate();
			obj.put("success","success");
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		json.put(obj);
		System.out.println(json.toString());
		return json.toString();
		
	}
	public static String add_shipping_address(HttpServletRequest request)
	{
		Connection conn =null;
		PreparedStatement psInsert = null;
		ResultSet rsShipping = null;
		Statement stSelectQuery = null;
		String strEmail = request.getParameter("email");
		String strQuery = "Select max(shippingid) shippingid from shipping_address";
		System.out.println(strQuery);
		String strOutput="";
		int intShippingId =0;
	 
		try {
			conn = DbConnection.getConnection();
			stSelectQuery = conn.createStatement();
			rsShipping = stSelectQuery.executeQuery(strQuery);
			if(rsShipping.next())
			{
				intShippingId = rsShipping.getInt("shippingid") + 1;
				int intUserId = Integer.parseInt(request.getParameter("userid"));
				String strAddress1 = request.getParameter("address1");
				String strAddress2 = request.getParameter("address2");
				String strCity = request.getParameter("city");
				String strState = request.getParameter("state");
				String strCountry = request.getParameter("country");
				String strZipcode = request.getParameter("zipcode");
				psInsert = conn.prepareStatement("Insert into shipping_address(shippingid,userid,address1,address2,city,state,country,"
						+ "zipcode) values(?,?,?,?,?,?,?,?)");
				psInsert.setInt(1, intShippingId);
				psInsert.setInt(2, intUserId);
				psInsert.setString(3, strAddress1);
				psInsert.setString(4, strAddress2);
				psInsert.setString(5, strCity);
				psInsert.setString(6, strState);
				psInsert.setString(7, strCountry);
				psInsert.setString(8, strZipcode);
				psInsert.executeUpdate();
				strOutput = "Record Inserted";
				
			}
			else
			{
				strOutput = "User Already Exists";
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			strOutput = "Record Not Inserted";
			e.printStackTrace();
		}
		System.out.println(strOutput);
		return strOutput;
	}
	
	public   void doPost(HttpServletRequest request,  HttpServletResponse response)throws IOException, ServletException{
 System.out.println('k');
      Connection conn =null;
      response.setContentType("text/html");
   PrintWriter out = response.getWriter();
String saveFile="";
String contentType = request.getContentType();
if ((contentType != null) && (contentType.indexOf("multipart/form-data") >= 0)) {
DataInputStream in = new DataInputStream(request.getInputStream());
int formDataLength = request.getContentLength();
byte dataBytes[] = new byte[formDataLength];
int byteRead = 0;
int totalBytesRead = 0;
while (totalBytesRead < formDataLength) {
byteRead = in.read(dataBytes, totalBytesRead,formDataLength);
totalBytesRead += byteRead;
}
String file = new String(dataBytes);
saveFile = file.substring(file.indexOf("filename=\"") + 10);
saveFile = saveFile.substring(0, saveFile.indexOf("\n"));
saveFile = saveFile.substring(saveFile.lastIndexOf("\\") + 1,saveFile.indexOf("\""));
int lastIndex = contentType.lastIndexOf("=");
String boundary = contentType.substring(lastIndex + 1,contentType.length());
int pos;
pos = file.indexOf("filename=\"");
pos = file.indexOf("\n", pos) + 1;
pos = file.indexOf("\n", pos) + 1;
pos = file.indexOf("\n", pos) + 1;
int boundaryLocation = file.indexOf(boundary, pos) - 4;
int startPos = ((file.substring(0, pos)).getBytes()).length;
int endPos = ((file.substring(0, boundaryLocation)).getBytes()).length;
File ff = new File(saveFile);
FileOutputStream fileOut = new FileOutputStream(ff);
fileOut.write(dataBytes, startPos, (endPos - startPos));
fileOut.flush();
fileOut.close();
out.println("You have successfully upload the file by the name of: "+saveFile);
try {
Class.forName("com.mysql.jdbc.Driver").newInstance();
conn = DbConnection.getConnection();
File f = new File(saveFile);
PreparedStatement psmnt = conn.prepareStatement("insert into image(image) values(?)");
FileInputStream fis = new FileInputStream(f);
psmnt.setBinaryStream(1, (InputStream)fis, (int)(f.length()));
int s = psmnt.executeUpdate();
if(s>0) {
System.out.println("Uploaded successfully !");
}
else{
System.out.println("unsucessfull to upload file.");
}
}
catch(Exception e){e.printStackTrace();
}
   out.println("<table align='center' border=1 width='200px'>");
 out.println("<tr><td colspan=2 align='center'><b>Download Images</b></td></tr><tr><td colspan=2> </td></tr>");
   String connectionURL = "jdbc:mysql://localhost:3306/test";
  Connection con=null;
  try{      
    Class.forName("com.mysql.jdbc.Driver").newInstance();
    con=DbConnection.getConnection();
    Statement stmt=con.createStatement();
    String strQuery = "select image_id from image";
    ResultSet rs = stmt.executeQuery(strQuery);
    int sno=0;
    while(rs.next())
    {
      sno++;
      out.println("<tr style=background-color:#efefef><td><b>"+sno+"</b></td><td align='center'><a href=DownloadFileServlet?id="+rs.getInt(1)+"><img src=DownloadFileServlet?id="+rs.getInt(1)+" width=50 height=50></a></td></tr>");
    }
      out.println("</table>");
    rs.close();
    con.close();
    stmt.close();
  }
  catch(Exception e)
  {
    e.getMessage();
  }
}
  }
	

}
