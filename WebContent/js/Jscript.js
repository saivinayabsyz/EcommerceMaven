

$(document).ready(function (){
	
	// $('#changepwd').hide();
	
	setTimeout(function() {
    $('#changepwd').stop(true, true).hide(); 
}, 1);

	
	

}); 


//for user reg
$(document).on("click", "#userreg",function userReg(){
	var fname=$('#txtFname').val();
	var lname=$('#txtlname').val();
	var email=$('#txtEmail').val();
	var mobile=$('#txtPwd').val();
	var password=$('#txtMobile').val();
	var address1=$('#txtAdd1').val();
	var address2=$('#txtAdd2').val();
	var city=$('#txtCity').val();
	var state=$('#txtState').val();
	var country=$('#txtCountry').val();
	var zipcode=$('#txtZipcode').val();
	var landmark=$('#txtLadmark').val();
	var pwd = $('#txtPwd').val();
	var cfrmpwd = $('#txtCfrmPwd').val();
	var image = $('#photo').val();
	if($('#rdMale').is(':checked'))
	 {
	 	var gender = "Male";
	 }
	 else
	 {
	 	var gender = "Female";
	 }
	if(pwd == cfrmpwd)
	{
		$.ajax({
			url : '/Ecommerce?serviceId=userreg',
			type: 'POST',
			data : {
				fname:fname,lname:lname,email:email,password:pwd,mobile:mobile,address1:address1,
				address2:address2,city:city,state:state,country:country,zipcode:zipcode,landmark:landmark,
				gender:gender,image:image
			},
			success : function(responseText) {
				console.log(responseText);
				var obj = jQuery.parseJSON(responseText);
				console.log(obj);
				if(obj[0].success == "success"){window.location.href = "/index.html";}
				
					else{alert(obj.message);}
						
			}
		});
	}
	else
	 {
		 alert("Password Not Matching");
	 }
	
});
//product for admin
$(document).on("click", "#addproduct",function userReg(){
	var pname=$('#txtPname').val();
	var pcount=$('#txtPcount').val();
	var bname=$('#txtBname').val();
	var price=$('#txtPrice').val();
		$.ajax({
		url : '/Ecommerce?serviceId=addproduct',
		type: 'POST',
		data : {
			productname:pname,stock:pcount,brand:bname,price:price
		},
		success : function(responseText) {
			var obj = jQuery.parseJSON(responseText);
			console.log(obj);
			if(obj == "success"){alert("Product Added");}
			
				else{alert("Try Again");}
					
		}
	});
});


//Add to cart tab not using currently
$(document).on("click", "#btn_addtocart", function() {
	//var productid = $('input[name=product]:checked').attr('id'); 
	alert("Added");
	var productid = $('#hidPrdId').val();
	var quantity = $('#txtgetQty').val();
	var price = $('#showPrdPrice').text();
	var amount = quantity * price;
	var userid = $('#hidid').val();//alert(productid);
	$.ajax({
		url : '/Ecommerce?serviceId=addtocart',
		type: 'POST',
		data : {
			userid :userid,productid:productid,quantity:quantity,amount:amount,
		},
		success : function(responseText) {
			var obj = jQuery.parseJSON(responseText);
			alert(obj[0].success[0].message);
			$('#divcontent').show();
			$('#userdiv').hide();
			$('#changepwd').hide();
			$('#prdndesc').hide();
					
		}
	});
});
//Place Order Button
/*$(document).on("click", "#placeorder", function() {
	//alert("mani");
	var shippingid="1";
	var searchParams = new URLSearchParams(window.location.search); //?anything=123
	var userid = searchParams.get("userid");
	var data="";
	jsonObj=[];
	var selected = [];
	
	$('#tbl_cart').each(function() {
		selected.push($(this).attr('chk_id '));
	});
	$.each(selected, function (index, value) {
		
alert(value);
		  console.log(value);
		var product_cart_id = value;
		//alert(product_cart_id);
		
		var split_ids = product_cart_id.split("_");
		
		var product_id = split_ids[0];
		
		var cart_id = split_ids[1];
		alert(cart_id);
		
		var qty_id = "#qty_"+cart_id;
		
		var amt_id = "#amt_"+product_id;
		
		var price =$(amt_id).text();
		
		var quantity = $(qty_id).val();
			
		var totalamount =  $('#txtTotal').val();
		
		/*var label= ["Order Received", "Order Processing", "Order dispatched", "Order Shipped", "Order Delivered"];
		var counter = 0;
		var elem = document.getElementById("label"); 
		setInterval(change, 1000); 
		function change() { 
			elem.innerHTML = text[counter]; 
			counter++; 
			if (counter >= text.length) {
				counter = 0; }
		}*/
		/*data={};
		data["productid"]= product_id;
		data["cartid"]= cart_id;
		data["quantity"]= quantity;
		data["price"]= price;
		data["totalamount"]= totalamount;
		data["shippingid"]= shippingid;
		data["userid"]= userid;
		data["status"]="Order Placed"; 
		 jsonObj.push(data);
	});
		var jsonString = JSON.stringify(jsonObj);
		console.log(jsonString);
	//alert(jsonString);
		console.log(selected);
		
	
	$.ajax({
		url : '/Ecommerce?serviceId=orders',
		type: 'POST',
		data : {
			data:jsonString
		},
		success : function(responseText) {
			if(responseText == "success"){
				alert("order placed");
				$( "#td_mycarts" ).click();
				}
				
				else{alert("try again");}
					
		}
	});
});*/

//order tab
var admorderid=[];
$(document).on("click", "#td_myorders", function() {
	$('#divhome').hide();
	$('#product_list').hide();
	$('#my_carts').hide();
		$('#my_cart').hide();
	$('#my_orders').show();
	$('#changepwd').hide();
	var searchParams = new URLSearchParams(window.location.search); //?anything=123
	var userid = searchParams.get("userid");
	
	//var userid = $('#hidid').val(); 
	if(userid!=1){
	$.ajax({
		url : '/Ecommerce?serviceId=myorders',
		type: 'POST',
		data : {
			userid:userid
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			var orderTable="<br/><br/><b>Pending Orders</b><table width='100%'><br/><table width='100%'><tr class='tile'><td><strong>Order No</strong></td><td><strong>Product Name</strong></td><td><strong>Date</strong></td><td><strong>Price</strong></td><td><strong>Quantity</strong></td><td><strong>Additional Charges</strong></td><td><strong>Amount</strong></td><td><strong>status</strong></td>";
			for(var i=0;i<obj[0].data.length;i++)
			{
				var totamt=(obj[0].data[i].price * obj[0].data[i].productquantity)+100;
				if(obj[0].data[i].status!="Order Delivered"){
				if(i%2 == 0)
				{
					orderTable = orderTable + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>100</td><td>"+totamt+"</td><td>"+obj[0].data[i].status+"</td></tr>";
					}
				else
				{
					orderTable = orderTable + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>100</td><td>"+totamt+"</td><td>"+obj[0].data[i].status+"</td></tr>";
					}
				}
				}
			orderTable = orderTable + "</table>";
			$('#my_orders').empty();
			
			var orderTable1="<br/><br/><b>Delivered Orders</b><table width='100%'><br/><tr class='tile'><td><strong>Order No</strong></td><td><strong>Product Name</strong></td><td><strong>Date</strong></td><td><strong>Price</strong></td><td><strong>Quantity</strong></td><td><strong>Additional Charges</strong></td><td><strong>Amount</strong></td><td><strong>status</strong></td>";
			
			for(var i=0;i<obj[0].data.length;i++)
			{
				var totamt=(obj[0].data[i].price * obj[0].data[i].productquantity)+100;
				
				if(obj[0].data[i].status=="Order Delivered"){
				if(i%2 == 0)
				{
					orderTable1 = orderTable1 + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>100</td><td>"+totamt+"</td><td>"+obj[0].data[i].status+"</td></tr>";
					}
				else
				{
					orderTable1 = orderTable1 + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>100</td><td>"+totamt+"</td><td>"+obj[0].data[i].status+"</td></tr>";
					}
				}
				
				}
			orderTable1 = orderTable1 + "</table>";
			$('#my_orders').append(orderTable);
			$('#my_orders').append(orderTable1);
								
		}
	});
	}
	if(userid==1){
	$.ajax({
		url : '/Ecommerce?serviceId=myorders',
		type: 'POST',
		data : {
			userid:userid
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			var orderTable="<br/><br/><b>Pending Orders</b><table width='100%'><br/><table width='100%'><tr class='tile'><td><strong>Order No</strong></td><td><strong>Product Name</strong></td><td><strong>Date</strong></td><td><strong>Price</strong></td><td><strong>Quantity</strong></td><td><strong>Additional Charges</strong></td><td><strong>Amount</strong></td><td><strong>status</strong></td><td></td>";
			for(var i=0;i<obj[0].data.length;i++)
			{
				var totamt=(obj[0].data[i].price * obj[0].data[i].productquantity)+100;
			        admorderid.push(obj[0].data[i].orderid);
				if(obj[0].data[i].status!="Order Delivered"){
				if(i%2 == 0)
				{
					orderTable = orderTable + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>100</td><td>"+totamt+"</td><td><button type='button' class='button' id="+obj[0].data[i].orderid+" onclick='changestatus(this.id)'>changestatus</button></td></tr>";
					}
				else
				{
					orderTable = orderTable + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>100</td><td>"+totamt+"</td><td><button type='button' class='button' id="+obj[0].data[i].orderid+" onclick='changestatus(this.id)'>changestatus</button></td></tr>";
					}
				}
				}
			orderTable = orderTable + "</table>";
			$('#my_orders').empty();
			//start of deiverd orders rendering
			var orderTable1="<br/><br/><b>Delivered Orders</b><table width='100%'><br/><tr class='tile'><td><strong>Order No</strong></td><td><strong>Product Name</strong></td><td><strong>Date</strong></td><td><strong>Price</strong></td><td><strong>Quantity</strong></td><td><strong>Additional Charges</strong></td><td><strong>Amount</strong></td><td><strong>status</strong></td>";
			
			for(var i=0;i<obj[0].data.length;i++)
			{
				var totamt=(obj[0].data[i].price * obj[0].data[i].productquantity)+100;
				
				if(obj[0].data[i].status=="Order Delivered"){
				if(i%2 == 0)
				{
					orderTable1 = orderTable1 + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>100</td><td>"+totamt+"</td><td>"+obj[0].data[i].status+"</td></tr>";
					}
				else
				{
					orderTable1 = orderTable1 + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>100</td><td>"+totamt+"</td><td>"+obj[0].data[i].status+"</td></tr>";
					}
				}
				
				}
			orderTable1 = orderTable1 + "</table>";
	$('#my_orders').append(orderTable);
			$('#my_orders').append(orderTable1);	
			//end of deiverd orders rendering
		}
	});
	}
	
	
		
	
});

//Save the changed password
$(document).on("click", "#btnSave", function() {
	var pwd = $('#txtPwd').val();
	var cfrmpwd = $('#txtCfrmPwd').val();
	var searchParams = new URLSearchParams(window.location.search); //?anything=123
	var userid = searchParams.get("userid");
	$.ajax({
		url : '/Ecommerce?serviceId=changepwd',
		type: 'POST',
		data : {
			userid : userid,pwd:pwd
		},
		success : function(responseText) {
			var obj = jQuery.parseJSON(responseText);
			
			if(obj[0].success == "success"){
				//alert("Password Changed Successfully");
				$('#modalbody').empty();	
				$('#modalbody').append("<p>Password Changed Successfully</P>");
				$('#pwdModal').modal('toggle');
				$('#txtPwd').val("");
				$('#txtCfrmPwd').val("");
				$('#divcontent').hide();
				$('#userdiv').show();
				$('#changepwd').hide();
				}
				else{alert("try again");}
					
		}
	});
});
//product tab div
$(document).on("click", "#product_list", function() {
	$('#changepwd').hide();
	loadProducts();
});
// user info tab
$(document).on("click","#username",function(){
	$('#divcontent').hide();
	$('#userdiv').show();
	$('#changepwd').hide();
	$('#mycartdata').hide();
})
//Back button on change password
$(document).on("click","#btnBack",function(){
	$('#divcontent').show();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#mycartdata').hide();
})
//Button to change password
$(document).on("click","#btnChngPwd",function(){
	
	/*var changePwdTable = "<table class="login-screen"><tr class='tbl_header'><td colspan='2'> <h2>Change Password</h2> </td>
				</tr>";
				
				changePwdTable = changePwdTable + "<tr>
					<td>Password</td><td><input type="text" name="txtPwd" id="txtPwd" /></td>
				</tr>";
				
				changePwdTable= changePwdTable+ "<tr>
					<td>Confirm Password</td><td><input type="password" name="txtCfrmPwd" id="txtCfrmPwd" /></td>
				</tr>";
				
				changePwdTable = changePwdTable+ "<tr>
					<td><input type="button" id="btnSave" value="Save" /><input type="button" id="btnUser" value="Back" /></td>
				</tr>
			</table>"; 
	$('#menu5').append(changePwdTable);*/
	
	//alert('vv');
	$('#divcontent').hide();
	$('#userdiv').hide();
	$('#changepwd').show();
	$('#mycartdata').hide();
})


$(document).on("click","#btnUser",function(){
	$('#divcontent').hide();
	$('#userdiv').show();
	$('#changepwd').hide();
	$('#mycartdata').hide();
})

	

//new codee
/*$(document).on("click","#td_home",function(){
	
	$('#divhome').show();
	$('#product_list').hide();
	$('#my_orders').hide();
	$('#changepwd').hide();
	
}) */

//new2
$(document).on("click","#td_home",function(){
	if ($("#divhome").length > 0){
//alert('panel id existing');
	$('#divhome').show();
	$('#product_list').hide();
	$('#my_orders').hide();
	$('#changepwd').hide(); }
	
})
//logout
$(document).on("click","#divlogout",function(){
	//alert("logging out");
	$('#hidid').val("");
	window.location.href = "/index.html";
}) 
//
$(document).on("click","#btn_backpd",function(){
	$('#divcontent').show();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#prdndesc').hide();
})
$(document).on("click","#btn_backcart",function(){
	$('#divcontent').show();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#prdndesc').hide();
	$('#mycartdata').hide();
	$('#product_list').show();
})



function hidechangepwdH(){
	//alert('home clicked');
$('#changepwd').hide();

}

function hidechangepwdCr(){
//alert('carts clicked');
	$('#changepwd').hide();
}
function loadProducts()
{
	
	$('#divcontent').show();
	$('#divhome').hide();
	$('#product_list').show();
	$('#my_carts').hide();
	$('#my_cart').hide();
	$('#my_orders').hide();
	$('#prdndesc').hide();
	$('#mycartdata').hide();
	$('#changepwd').hide();
	$.ajax({
		url : '/Ecommerce?serviceId=show_products',
		type: 'POST',
		data : {
			
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(responseText);
			//alert(obj);
			
  
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			var productTable="<table><tr class='tile' style='height:30px;font-size:20px'><td></td><td><strong>Brand</strong></td><td><b>Product Name</b></td></td><td><b> Price</b></td></td><td></td></tr>";
			for(var i=0;i<obj[0].data.length;i++)
			{
				var pr_id = "pr_"+obj[0].data[i].productid;
				var filename = "images/"+obj[0].data[i].filename;
				var pid=obj[0].data[i].productid;
				var pquantity="2";
				//var quant;
				var pprice=obj[0].data[i].price;
				//alert(amt_id);
				//productTable = productTable + "<tr style='height:100px;'><td><input name='product' type ='radio' id="+obj[0].data[i].productid+" onclick='showproduct(this.id);'/></td><td>"+obj[0].data[i].brandname+"</td><td>"+obj[0].data[i].productname+"</td><td id="+pr_id+">"+obj[0].data[i].price+"</td>" +
				if(i%2 == 0)
				{
					productTable = productTable + "<tr class='tile' style='height:100px;'><td><img id="+obj[0].data[i].productid+" src="+filename+" height='100' width='100'/></td><td>"+obj[0].data[i].brandname+"</td><td>"+obj[0].data[i].productname+"</td><td id="+pr_id+">"+obj[0].data[i].price+"</td><td><button  type='button' class='btn btn-primary btn-md' onclick='Addtocart("+pid+","+pquantity+","+pprice+")'>Add to Cart</button></td>" +
					"</tr>";
					}
				else
				{
					productTable = productTable + "<tr class='tile' style='height:100px;'><td><img id="+obj[0].data[i].productid+" src="+filename+" height='100' width='100'/></td><td>"+obj[0].data[i].brandname+"</td><td>"+obj[0].data[i].productname+"</td><td id="+pr_id+">"+obj[0].data[i].price+"</td><td><button  type='button' class='btn btn-primary btn-md' onclick='Addtocart("+pid+","+pquantity+","+pprice+")'>Add to Cart</button></td>" +
					"</tr>";
					}
				//alert(document.getElementById("quantity").value);
				}
				
			productTable = productTable + "</table>";
			$('#product_list').empty();
			$('#product_list').append(productTable);
		}
	});
	/*$('#divcontent').show();
	$('#divhome').hide();
	$('#product_list').show();
	$('#my_carts').hide();
	$('#my_orders').hide();
	$('#prdndesc').hide();
	$('#mycartdata').hide();
	$.ajax({
		url : '/Ecommerce?serviceId=show_products',
		type: 'POST',
		data : {
			
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(responseText);
			//alert(obj);
			
  
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			var productTable="<table class='table table-bordered' width='100%'><tr class='tbl_header' style='height:30px;'><td>Select</td><td>Brand</td><td>Product Name</td><td> Price</td><td>Cart</td></tr>";
			//var productTable=" <div class="tile tile-grid-item tile-column-3">
   // <div class="tile-inner-padded tile-grid-item-inner">";
			for(var i=0;i<obj[0].data.length;i++)
			{
				var pr_id = "pr_"+obj[0].data[i].productid;
				var filename = "images/"+obj[0].data[i].filename;
				var pid=obj[0].data[i].productid;
				//var pquantity="2";
				//var quant;
				var pprice=obj[0].data[i].price;
				//alert(amt_id);
				productTable = productTable + "<tr style='height:100px;'><td><input name='product' type ='radio' id="+obj[0].data[i].productid+" onclick='showproduct(this.id);'/></td><td>"+obj[0].data[i].brandname+"</td><td>"+obj[0].data[i].productname+"</td><td id="+pr_id+">"+obj[0].data[i].price+"</td>" +
				if(i%2 == 0)
				{
					productTable = productTable + "<tr class='tbl_even_row' style='height:100px;'><td><img id="+obj[0].data[i].productid+" src="+filename+" height='100' width='100'/></td><td>"+obj[0].data[i].brandname+"</td><td>"+obj[0].data[i].productname+"</td><td id="+pr_id+">"+obj[0].data[i].price+"</td><td><button type='button' onclick='Addtocart("+pid+","+pprice+")'>Add to Cart</button></td>" +
					"</tr>";
					//productTable = productTable + "<img id="+obj[0].data[i].productid+" src="+filename+" height='100' width='100'/>"+obj[0].data[i].brandname+obj[0].data[i].productname+obj[0].data[i].price+"<button type='button' onclick='Addtocart("+pid+","+pprice+")'>Add to Cart</button>" +
				
					}
				else
				{
					productTable = productTable + "<tr class='tbl_odd_row' style='height:100px;'><td><img id="+obj[0].data[i].productid+" src="+filename+" height='100' width='100'/></td><td>"+obj[0].data[i].brandname+"</td><td>"+obj[0].data[i].productname+"</td><td id="+pr_id+">"+obj[0].data[i].price+"</td><td><button type='button' onclick='Addtocart("+pid+","+pprice+")'>Add to Cart</button></td>" +
					"</tr>";
					//productTable = productTable + "<img id="+obj[0].data[i].productid+" src="+filename+" height='100' width='100'/>"+obj[0].data[i].brandname+obj[0].data[i].productname+obj[0].data[i].price+"<button type='button' onclick='Addtocart("+pid+","+pprice+")'>Add to Cart</button>" +
				
				
					}
				//alert(document.getElementById("quantity").value);
				}
				
			productTable = productTable + "</table>";
			//productTable = productTable + "</div>"+"</div>";
			$('#product_list').empty();
			$('#product_list').append(productTable);
		}
	});*/
}
//Add to cart function
function Addtocart(productid,price)
{
	
    var quantity = 1;
	
var amount = 1 * price;
	var searchParams = new URLSearchParams(window.location.search); //?anything=123
	var userid = searchParams.get("userid");
	$.ajax({
		url : '/Ecommerce?serviceId=addtocart',
		type: 'POST',
		data : {
			userid :userid,productid:productid,quantity:quantity,amount:amount,
		},
		success : function(responseText) {
			var obj = jQuery.parseJSON(responseText);
			//alert("Added");
			$('#modalbody').empty();	
			$('#modalbody').append("<p>Added to Cart</P>");
			$('#pwdModal').modal('toggle');
			$('#divcontent').show();
			$('#userdiv').hide();
			$('#changepwd').hide();
			$('#prdndesc').hide();
					
		}
	});
}
function placeorder(chkid){
	
var shippingid="1";
	var searchParams = new URLSearchParams(window.location.search); //?anything=123
	var userid = searchParams.get("userid");
	var data="";
	jsonObj=[];
	var selected = [];
	for(var id=0;id<chkid.length;id++){ 
		var value=chkid[id];
		
		var product_cart_id = value;
		//alert(product_cart_id);
		var split_ids = product_cart_id.split("_");
		var product_id = split_ids[0];
		var cart_id = split_ids[1];
		
		var qty_id = "#qty_"+cart_id;
		
		var amt_id = "#amt_"+product_id;
		
		var price =$(amt_id).text();
		
		var quantity = $(qty_id).val();
			
		var totalamount =  $('#txtTotal').val();
		
		/*var label= ["Order Received", "Order Processing", "Order dispatched", "Order Shipped", "Order Delivered"];
		var counter = 0;
		var elem = document.getElementById("label"); 
		setInterval(change, 1000); 
		function change() { 
			elem.innerHTML = text[counter]; 
			counter++; 
			if (counter >= text.length) {
				counter = 0; }
		}*/
		data={};
		data["productid"]= product_id;
		data["cartid"]= cart_id;
		data["quantity"]= quantity;
		data["price"]= price;
		data["totalamount"]= totalamount;
		data["shippingid"]= shippingid;
		data["userid"]= userid;
		data["status"]="Order Placed"; 
		 jsonObj.push(data);
	}
		var jsonString = JSON.stringify(jsonObj);
		console.log(jsonString);
	//alert(jsonString);
		console.log(selected);
		
	
	$.ajax({
		url : '/Ecommerce?serviceId=orders',
		type: 'POST',
		data : {
			data:jsonString
		},
		success : function(responseText) {
			if(responseText == "success"){
				//alert("order placed");
				$('#modalbody').empty();
				$('#modalbody').append("<p>order placed</P>");
				$('#pwdModal').modal('toggle');
				$( "#td_myorders" ).click();
				}
				
				else{alert("try again");}
					
		}
	});
}
//changestatus
function changestatus(orderid)
{
	alert (orderid);
  
	var searchParams = new URLSearchParams(window.location.search); //?anything=123
	var userid = searchParams.get("userid");
	$.ajax({
		url : '/Ecommerce?serviceId=changestatus',
		type: 'POST',
		data : {
			userid :userid,orderid:orderid
		},
		success : function(responseText) {
			var obj = jQuery.parseJSON(responseText);
			
			$('#divcontent').show();
			$('#userdiv').hide();
			$('#changepwd').hide();
			$('#prdndesc').hide();
			$( "#td_myorders" ).click();		
		}
	});
}
//changesattus
//Add ot cart function ends
function showproduct(prdid)
{
	
	$('#divcontent').hide();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#prdndesc').show();
	
	$.ajax({
		url : '/Ecommerce?serviceId=show_productinfo',
		type: 'POST',
		data : {
			prodid:prdid,
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			
			//	$('#menu1').show();
				$('#product_list').show();
					
			$('#showPrdName').text(obj[0].data[0].productname);
			$('#showBrand').text(obj[0].data[0].brandname);
			$('#showPrdPrice').text(obj[0].data[0].price);
			$('#hidPrdId').val("");
			$('#hidPrdId').val(obj[0].data[0].productid);
			//$('#imgid').html("<img  alt='product' src='2017-10-06.jpg' width='250px' height='250px'>");
		}
	});
}
function showuserinfo()
{
	var Cl=localStorage.getItem("loggedin")
	
	if(Cl==null){
	window.location.href = "/index.html";}
	var searchParams = new URLSearchParams(window.location.search); //?anything=123
	var userid = searchParams.get("userid");
	console.log(userid);
	$('#divcontent').show();
	$('#userdiv').hide();
	$('#changepwd').hide();
	$('#prdndesc').hide();
	$.ajax({
		url : '/Ecommerce?serviceId=showuser',
		type: 'POST',
		data : {
			userid:userid,
		},
		success : function(responseText) {
			
			console.log(responseText);
			console.log('Showuserinfo'+responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			//console.log(obj);
			//alert(obj[0].data[0].zipcode);
			if(obj[0].success[0].success == "success"){
				$('#username').text('Welcome '+obj[0].data[0].firstname);
				var usertable="<table border='1' width='100%'><tr class='tbl_header'><td colspan='3' class='Bold1'><strong>User Info</strong></td><td colspan='1' class='Bold1'><strong><input type='button' class='btn btn-primary btn-md' id='btnChngPwd' value='Change Password' /></strong></td></tr><br/>";
				//usertable = usertable + "<tr><td class='tbl_header'>profilepic</td><td><img src="WebContent/images/dell_laptop.jpg" alt="Girl in a jacket" width="500" height="600"></td>";
			
				usertable = usertable + "<tr class='tile'><td class='tbl_header'><strong>Firstname</strong></td><td>"+obj[0].data[0].firstname+"</td><td class='tbl_header'><strong>Lastname</strong></td><td>"+obj[0].data[0].lastname+"</td></tr>";
				usertable = usertable + "<tr class='tile'><td class='tbl_header'><strong>Email</strong></td><td>"+obj[0].data[0].email+"</td><td class='tbl_header'><strong>Mobile</strong></td><td>"+obj[0].data[0].mobilephone+"</td></tr>";		
				usertable = usertable + "<tr class='tile'><td class='tbl_header'><strong>Address1</strong></td><td>"+obj[0].data[0].address1__c+"</td><td class='tbl_header'><strong>Address2</strong></td><td>"+obj[0].data[0].address2__c+"</td></tr>";
				usertable = usertable + "<tr class='tile'><td class='tbl_header'><strong>City</strong></td><td>"+obj[0].data[0].mailingcity+"</td><td class='tbl_header'><strong>State</strong></td><td>"+obj[0].data[0].mailingstate+"</td></tr>";
				usertable = usertable + "<tr class='tile'><td class='tbl_header'><strong>Country</strong></td><td>"+obj[0].data[0].country+"</td><td class='tbl_header'><strong>Zipcode</strong></td><td>"+obj[0].data[0].zipcode+"</td></tr></table>";
								
				//usertable = usertable + "<tr><td colspan='4' align='center'><input type='button' id='btnChngPwd' value='Change Password' /></td></tr></table>";
				//usertable = usertable + "<tr><td colspan='4' align='center'><img  alt='product' src='images/download.jpg' width='250px' height='250px'/></td></tr>
			 $("#btnChngPwd").click(function(){
       
    }); 
				$('#menu5').empty();
				$('#menu5').append(usertable);
				//orders table start
				/*var searchParams = new URLSearchParams(window.location.search); //?anything=123
	var userid = searchParams.get("userid");
	//var userid = $('#hidid').val(); 
	$.ajax({
		url : '/Ecommerce?serviceId=myorders',
		type: 'POST',
		data : {
			userid:userid
		},
		success : function(responseText) {
			console.log(responseText);
			var obj = jQuery.parseJSON(responseText);
			//alert(obj.length);
			//alert(obj[0].data.length);
			//alert(obj[0].data[0].productname);
			var orderTable="<br/><br/><b>Order History</b><table width='100%'><br/><tr class='tile'><td><strong>Order No</strong></td><td><strong>Product Name</strong></td><td><strong>Date</strong></td><td><strong>Price</strong></td><td><strong>Quantity</strong></td><td><strong>Amount</strong></td><td><strong>status</strong></td>";
			
			for(var i=0;i<obj[0].data.length;i++)
			{
				var totamt=obj[0].data[i].price * obj[0].data[i].productquantity;
				
				if(obj[0].data[i].status=="Order Delivered"){
				if(i%2 == 0)
				{
					orderTable = orderTable + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>"+totamt+"</td><td>"+obj[0].data[i].status+"</td></tr>";
					}
				else
				{
					orderTable = orderTable + "<tr class='tile'><td>"+obj[0].data[i].orderid+"</td><td>"+obj[0].data[i].productname+"</td>" +
					"<td>"+obj[0].data[i].orderdate+"</td><td>"+obj[0].data[i].price+"</td><td>"+obj[0].data[i].productquantity+"</td><td>"+totamt+"</td><td>"+obj[0].data[i].status+"</td></tr>";
					}
				}
				
				}
			orderTable = orderTable + "</table>";
			//orderTable = orderTable + "<br/><br/><input type='button' id='btnChngPwd' value='Change Password' />"
			//$('#my_orders').empty();
			//$('#my_orders').append(orderTable);
			
			$('#menu5').append(orderTable);					
		}
	});*/
				//end of orders table
				
				
				
				
				$('#hidid').val(userid);
			}
			else{
				alert("Wrong Login Credientials");$('#txtEmail').val("");$('#txtPwd').val("");
			}
			
		}
	});
	
	

	
	}
var proarray = [];
var cartarray = [];
var chk_id
var chk_idarray=[];		
$(document).on("click", "#td_mycarts", function() {		
	var searchParams = new URLSearchParams(window.location.search); //?anything=123		
	var userid = searchParams.get("userid");		
	//var userid=$('#hidid').val();		
	$.ajax({		
		url : '/Ecommerce?serviceId=mycarts',		
		type: 'POST',		
		data : {		
			userid:userid,		
		},		
		success : function(responseText) {		
			//console.log(responseText);		
			var obj = jQuery.parseJSON(responseText);		
			if(obj[0].success[0].success == "success")		
			{		
				$('#my_carts').show();
				$('#my_cart').show();
				//$('#nocart_image').hide();
				//alert(obj[0].success[0].success);		
				//alert(obj.length);		
				//alert(obj[0].data.length);		
				//alert(obj[0].data[0].productname);		
				var cartTable="<table width='100%' border='1' class='tile' id='tbl_cart'><tr class='tbl_header'></tr><tr class='tbl_header'><td><b>Product Name</b></td><td><b>Quantity</b></td><td><b>Price</b></td><td></td></tr>";		
				var chkVal = 2;		
				chk_idarray.length=0;
				cartarray.length=0;
				for(var i=0;i<obj[0].data.length;i++)		
				{		
					var qty_id = "qty_"+ obj[0].data[i].cartid;		
					var amt_id = "amt_"+ chkVal;		
					var rm_id = "rm_"+ obj[0].data[i].cartid;		
					 chk_id = obj[0].data[i].productid + "_" + obj[0].data[i].cartid;		
					chk_idarray.push(chk_id);		
					proarray.push(obj[0].data[i].productid);		
					cartarray.push(obj[0].data[i].cartid);		
							
					var obj1=obj;		
					//var chk_id = "chk_"+chkVal;		
					chkVal = parseInt(chkVal)+1;		
					if(i%2 == 0)		
					{		
						cartTable = cartTable + "<tr class='tile'><td>"+obj[0].data[i].productname+"</td>" +		
						"<td ><input id="+qty_id+" type='number' name='inputcell' value='1' onchange='add_totalamount()'/></td><td id="+amt_id+">"+obj[0].data[i].price+"</td><td><button type='button' class='button' id="+rm_id+" onclick='delete_cartitem(this.id)'>remove</button></td>" +		
						"</tr>";		
						}		
					else		
					{		
						cartTable = cartTable + "<tr class='tile'><td>"+obj[0].data[i].productname+"</td>" +		
						"<td ><input type='number' id="+qty_id+" name='inputcell' value='1' onchange='add_totalamount()'/></td><td id="+amt_id+">"+obj[0].data[i].price+"</td><td><button type='button' class='button' id="+rm_id+" onclick='delete_cartitem(this.id)'>remove</button></td>" +		
						"</tr>";		
						}		
							
					}		
				cartTable = cartTable + "<tr class='tile'><td colspan='2'>Additional Charges</td><td colspan='3'><output type='number' id='addcharges' value ='0'/></td></tr>";		
						
				cartTable = cartTable + "<tr class='tile'><td colspan='2'>Total Amount</td><td colspan='3'><input type='text' id='txtTotal' value ='0' disabled height='40'/></td></tr></table>";		
				cartTable = cartTable + "<br/><input type='button' class='btn btn-primary btn-md'  value='Place Order' onclick='placeorder(chk_idarray)' >"		
				$('#my_carts').empty();	
			$('#my_cart').empty();	
				console.log("cartTable"+cartTable);
				$('#my_carts').append(cartTable);	
				add_totalamount();
			}		
			else		
			{	$('#my_carts').empty();	
				$('#my_cart').show();	
				
				//alert(obj[0].success[0].message);		
				//loadProducts();		
			}		
					
										
		}		
	});		
});		
var chk_idarray1=[];		
function delete_cartitem(cartid)		
{		
	$('#divcontent').hide();		
	$('#divhome').hide();		
	$('#product_list').hide();		
	$('#my_orders').hide();		
	$('#prdndesc').hide();		
	$('#userdiv').hide();		
	$('#mycartdata').show();		
	var cart_id = cartid.split("_");		
	//alert(cartid);alert(cart_id[1]);		
	//var userid=$('#hidid').val();		
	var searchParams = new URLSearchParams(window.location.search); //?anything=123		
	var userid = searchParams.get("userid");		
		
	$.ajax({		
		url : '/Ecommerce?serviceId=deletecart',		
		type: 'POST',		
		data : {		
			userid:userid,cartid:cart_id[1]		
		},		
		success : function(responseText) {
$('#modalbody').empty();		
			$('#modalbody').append("<p>Deleted</P>");
				$('#pwdModal').modal('toggle');
			chk_idarray1.length=0;	
			cartarray.length=0;
				$( "#td_mycarts" ).click();	
			/*console.log(responseText);		
			var obj = jQuery.parseJSON(responseText);		
			//alert("obj[0].success[0].success"+obj[0].success[0].success);		
			if(obj[0].success[0].success == "success")		
			{		
			var cartTable="<table width='100%' border='1' class='tile' id='tbl_cart'><tr class='tbl_header'><td colspan='5'><b>My Carts Info</b></td></tr><tr class='tbl_header'><td><b>Product Name</b></td><td><b>Quantity</b></td><td><b>Amount</b></td><td><b>Remove Item</b></td></tr>";		
				var chkVal = 2;		
						
				for(var i=0;i<obj[0].data.length;i++)		
				{		
					var qty_id = "qty_"+ obj[0].data[i].cartid;		
					var amt_id = "amt_"+ chkVal;		
					var rm_id = "rm_"+ obj[0].data[i].cartid;		
					 chk_id = obj[0].data[i].productid + "_" + obj[0].data[i].cartid;		
					proarray.push(obj[0].data[i].productid);		
					cartarray.push(obj[0].data[i].cartid);		
					chk_idarray1.push(chk_id);		
					var obj1=obj;		
					//var chk_id = "chk_"+chkVal;		
					chkVal = parseInt(chkVal)+1;		
					if(i%2 == 0)		
					{		
						cartTable = cartTable + "<tr class='tile'><td>"+obj[0].data[i].productname+"</td>" +		
						"<td ><input id="+qty_id+" type='number' name='inputcell' value='0' onchange='add_totalamount(chk_id)'/></td><td id="+amt_id+">"+obj[0].data[i].price+"</td><td><button type='button' id="+rm_id+" onclick='delete_cartitem(this.id)'>remove</button></td>" +		
						"</tr>";		
						}		
					else		
					{		
						cartTable = cartTable + "<tr class='tile'><td>"+obj[0].data[i].productname+"</td>" +		
						"<td ><input type='number' id="+qty_id+" name='inputcell' value='0' onchange='add_totalamount(chk_id)'/></td><td id="+amt_id+">"+obj[0].data[i].price+"</td><td><button type='button' id="+rm_id+" onclick='delete_cartitem(this.id)'>remove</button></td>" +		
						"</tr>";		
						}		
							
					}		
				cartTable = cartTable + "<tr class='tile'><td colspan='2'>Additional Charges</td><td colspan='3'><output type='number' id='addcharges' value ='0'/></td></tr>";		
						
				cartTable = cartTable + "<tr class='tile'><td colspan='2'>Total Amount</td><td colspan='3'><input type='text' id='txtTotal' value ='0' disabled height='40'/></td></tr></table>";		
				cartTable = cartTable + "<br/><input type='button'  value='Place Order' nclick='placeorder(chk_idarray1)'>"		
					$('#my_carts').empty();		
				$('#my_carts').append(cartTable);		
						
		}		
		else		
		{		
			alert(obj[0].success[0].message);		
			$('#my_carts').empty();		
			loadProducts();		
		}	*/	
										
		}		
	});	
}		
function showrow()		
{		
	$('.products').hide();		
}		
function add_totalamount()		
{		
	console.log(cartarray);		
			
	var total_amount=0;		
	var prod_amount = 0;		
			
	var rowCount = $('#tbl_cart tr').length;		
	
	var MyRows = $('table#tbl_cart').find('tbody').find('tr');		
		for(var id=2;id<rowCount-2;id++){		
					
		 // if($("#"+proarray [id2]+"_"+cartarray[id2]).is(':checked')){		
			prod_amount = 0;		
			var amt =  $(MyRows[id]).find('td:eq(2)').html();
			console.log("amt"+amt);
			var qty =  $('#qty_'+cartarray[id-2]).val();	
			console.log("qtyid"+cartarray[id-2]);
			console.log("qty"+qty);
			  if(qty==""){		
			  qty=0;		
			  }		
					
			prod_amount = amt*parseInt(qty);		
					console.log("prod_amount"+prod_amount);
			  //prod_amount = amt*parseInt(qty);	
			 console.log("total_amount"+total_amount);	
			total_amount = total_amount + prod_amount;		
			 console.log("total_amount"+total_amount);		
					
			  			 		
		//}			
						
	}		
			
	if(total_amount>0){		
	 $('#addcharges').val(100);		
	total_amount=total_amount+100;		
	}		
	else{		
	 $('#addcharges').val("");		
	}		
			
	$('#txtTotal').val("");		
	//qty = isNaN(qty) ? '0.00' : qty;		
	$('#txtTotal').val(total_amount);		
}		
