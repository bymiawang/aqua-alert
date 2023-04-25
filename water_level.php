<?php 
	$mysqli = new mysqli('304.itpwebdev.com', 'itp460_team2', 'u$cItp2023', 'itp460_team2');
	if ( $mysqli->connect_errno ) {
		echo $mysqli->connect_error;
		exit();
	}
	$mysqli->set_charset('utf8');

	$sql = "SELECT *
			FROM water_level;";
	$results = $mysqli->query($sql);

	if ( !$results ) {
		echo $mysqli->error;
		$mysqli->close();
		exit();
	}

	$mysqli -> close();
?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="keywords" content="Catalina Island, water levels, drought">
	<meta name="description" content="Catalina Island Water Levels">
	<meta name="viewport" content="width=device-width, intial-scale=1.0">
	<title>Water Levels</title>
	<script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
	<link rel="stylesheet" href="style-2.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap" rel="stylesheet">
	<style>
		.percentage {
			padding: 4px 7.73554px;
			gap: 0px;

			width: 36.47px;
			height: 20px;
			display: inline;
			/* Water Levels/Water (Good) */
			background: #577F9C;
			border-radius: 12.8926px;	
		}
		.row-1{
			display: flex;
			flex-direction: row;
			align-content: flex-start;
			justify-content: space-around;
		}
	</style>
</head>

<body>
<!--	navbar-->
<!--	navbar-->
<div id="navbar">
	<ul class="navbar">
		<li><a class="nav logo" href="home.html"><img src="logo.png" alt="logo"></a></li>
		<li>
			<li><a class="paragraph-1 nav" href="water_level.php">water levels</a></li>
			<li><a class="paragraph-1 nav active" href="weather.html">weather</a></li>
			<li><a class="paragraph-1 nav" href="index.html">tips</a></li>
			<li><a class="paragraph-1 nav" href="history.html">history</a></li>
		</li>
	</ul>
</div>
<!--	page container-->
	<div class="main-container"> 
<!--		container for the water levels-->
		<div class="box-container">
			<span class="heading-3">Water Level 💧</span> <span class="heading-4"><br>Most recent <b> Middle Ranch Reservoir </b>data collected: <b id="waterDate">2 Days Ago</b></span>
			<div>
			  <canvas id="WaterLevel" style="height:auto; width:420px;max-width:860px"></canvas>
			</div>
		</div>
<!--		sqaure container for water conservation-->
		<div class="square-container">
			<span class="paragraph-3">Tariff Stage Level &amp; Mandatory Water Conservation <br> <span class="percentage">0%</span><b class="emergency-text" id="stage"></b></span>
			<div>
			  <canvas id="StackWaterLevel" style="height: 240px; width:100%;max-width:860px"></canvas>
			</div>
		</div>
		<div class="clear"></div>
<!--		container for tide levels-->
		<div class="box-container">
			<span class="heading-3">Tide Level 🌊</span> <span class="heading-4"><br>Most recent data collected: <b id="tidal"></b></span>
			<div>
			  <canvas id="TideLevel" style="height:300px; width:100%;max-width:860px"></canvas>
			</div>
		</div>
<!--		square container for tide information-->
		<div class="square-container">
			<div>
			  <div class="row-1">
				  <div class="column-1 paragraph-3"><br>Current Tide Level: <br><span class="emergency-text" id="tideLevel"></span></div>
				  <div class="column-2 paragraph-3"><br>Next Tide At: <br><span class="emergency-text" id="time"></span></div>
			  </div>
			  <canvas id="StackTideLevel" style="height: 270px; width:100%;max-width:860px"></canvas>
			</div>
		</div>
		<div class="float"></div>
		<br>
<!--		information about catalina island-->
		<div class="heading-2">About Catalina Island Water Preservation</div>
		<br><br>
		<div class="paragraph-2">
			The Middle Ranch Reservoir, also known as Thompson’s Reservoir, is the main gauge for assessing the fresh water supply conditions for Santa Catalina Island. The measured water level triggers the different stages of water conservation and rationing as laid out in the Schedule 14.1 tariffs.

			Middle Ranch Reservoir Capacity (approximate) and tariff stage levels (**1 acre foot = 325,851 gallons):
			<ul>
				<li>1053 Acre Feet Approximate total Capacity</li>
				<li>600 Acre Feet -> Stage 1: Mandatory Water Conservation</li>
				<li>300 Acre Feet -> Stage 2: Mandatory Water Rationing - 25% use reduction compared to baseline year</li>
				<li>200 Acre Feet -> Stage 3: 50% use reduction compared to baseline year</li>
				<li>50 Acre Feet -> Stage 4: 75% use reduction compared to baseline year</li>
			
		</div>
	</div>
	<script type="text/javascript" src="scrape_water.js"></script>
	<script type="text/javascript" src="levels.js"></script>
	<script type="text/javascript">
		var xWaterValues = [];
		var yWaterValues = [];
		var xStackWaterValues = ["Water Level"];
		<?php while($row = $results->fetch_assoc() ): ?>
			<?php if($row['id']<29):?>
				yWaterValues.push(<?php echo $row['water_levels'];?>)
				xWaterValues.push("<?php echo $row['date'];?>")
			<?php endif;?>
			<?php if($row['id']==1):?>
				var yStackCurrentWaterValues= [<?php echo $row['water_levels'];?>]
				document.querySelector('#waterDate').innerHTML = new Date("<?php echo $row['date']?>".split("-").join("/")).toDateString()
			<?php endif;?>
		<?php endwhile;?>
		xWaterValues.reverse()
		yWaterValues.reverse()
		var waterBarColors = "#A1CBE3";
		new Chart("WaterLevel", {
		type: "bar",
		data: {
			labels: xWaterValues,
			datasets: [
			{
				label: "Water Level",
				backgroundColor: waterBarColors,
				data: yWaterValues,
				barThickness: 7,
				borderRadius: 10,
			},
			],
		},
		options: {
			responsive: true,
			plugins: {
			legend: false,
			tooltip: {
				callbacks: {
				label: (item) =>
					`${item.dataset.label}: ${item.formattedValue} Acre Feet`,
				},
			},
			},
			layout: {
			padding: {
				top: 25,
			},
			},
			scales: {
			y: {
				stacked: true,
				title: {
				display: true,
				text: "Acre Feet",
				},
				grid: {
				drawBorder: false,
				drawOnChartArea: false,
				display: false,
				},
			},
			x: {
				stacked: true,
				grid: {
				drawBorder: false,
				drawOnChartArea: false,
				display: false,
				},
			},
			},
		},
		});

		if (yStackCurrentWaterValues > 600){
			document.querySelector('.percentage').innerHTML =" -0%"
			document.querySelector('#stage').innerHTML ='<br> Stage 0'
			document.querySelector('.percentage').style.backgroundColor = "Green"
		}else if (yStackCurrentWaterValues > 300){
			document.querySelector('.percentage').innerHTML =" -0%"
			document.querySelector('#stage').innerHTML ='<br> Stage 1'
			document.querySelector('.percentage').style.backgroundColor = "Grey"
		}else if (yStackCurrentWaterValues > 200){
			document.querySelector('.percentage').innerHTML =" -25%"
			document.querySelector('#stage').innerHTML ='<br> Stage 2'
			document.querySelector('.percentage').style.backgroundColor = "Orange"
		}else if (yStackCurrentWaterValues > 50){
			document.querySelector('.percentage').innerHTML =" -50%"
			document.querySelector('#stage').innerHTML ='<br> Stage 3'
			document.querySelector('.percentage').style.backgroundColor = "Red"
		}else if (yStackCurrentWaterValues <= 50){
			document.querySelector('.percentage').innerHTML =" -75%"
			document.querySelector('#stage').innerHTML ='<br> Stage 4'
			document.querySelector('.percentage').style.backgroundColor = "Red"
		}

		var yStackMaxWaterValues = [1053 - yStackCurrentWaterValues];
		new Chart("StackWaterLevel", {
		type: "bar",
		data: {
			labels: xStackWaterValues,
			datasets: [
			{
				label: "Current Water Level",
				backgroundColor: "#577F9C",
				data: yStackCurrentWaterValues,
				borderSkipped: false,
			},
			{
				label: "Max Water Storage",
				backgroundColor: "#FFF",
				data: yStackMaxWaterValues,
				borderRadius: {
				topLeft: 10,
				topRight: 10,
				},
				borderSkipped: false,
			},
			],
		},
		options: {
			responsive: true,
			plugins: {
			legend: {
				display: true,
				reverse: true,
				position: "right",
				maxWidth: 150,
				labels: {
				color: "#FFF",
				usePointStyle: true,
				pointStyle: "rectRounded",
				},
			},
			tooltip: {
				callbacks: {
				label: (item) =>
					item.dataset.label == "Max Water Storage"
					? `${item.dataset.label}: 1,053 Acre Feet`
					: `${item.dataset.label}: ${item.formattedValue} Acre Feet`,
				},
			},
			},
			scales: {
			y: {
				ticks: {
				display: false,
				},
				stacked: true,
				grid: {
				drawBorder: false,
				drawOnChartArea: false,
				display: false,
				},
			},
			x: {
				stacked: true,
				ticks: {
				display: true,
				color: "#FFF",
				},
				grid: {
				drawBorder: false,
				drawOnChartArea: false,
				display: false,
				},
			},
			},
		},
		});
	</script>
	
</body>
</html>
