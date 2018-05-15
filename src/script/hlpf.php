<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<?php
include_once('simple_html_dom.php');

ini_set('memory_limit', '-1');
set_time_limit(0);

try {
	# Use the Curl extension to query Google and get back a page of results
	
	
	$url = "https://sustainabledevelopment.un.org/hlpf/2017#programme";
	//$html = file_get_html("https://sustainabledevelopment.un.org/hlpf/2017#programme");	
	//echo  $html;
	//exit(0);

	$html = new simple_html_dom();   
	$html->load_file('test.html');

}
catch(Exception $e) {
  echo 'Error Loading File: ' .$e->getMessage();
}


$x = 0;
$preDate = "";		
$skipFirst=0;
$splitupEnabled=1;
$biographieSet = array();
try {

		$data1 = array();

		foreach($html->find('div[class=programmeLine]') as $event){

			$location = "";
			$eventType = "";
			$shortDescr = "";
			$shortDescrLink = "";
			$eventId = "";
			$eventTitle = "";
			$time = "";
			
			$x++;
			$eventDt = trim($event->parent()->id);
			echo  "<br> EventDt" . $eventDt . " -- " .  "predt" . $preDate .   "<br>";
			
			//if( $x > 4)break;
			
			
			$timeLocation  = $event->find('div.programmeLineTime', 0);			

			$location =  extractLocationInfo($timeLocation);
			
			
			$time = trim($timeLocation->innertext);
			$eventType   = trim($event->find('div.programmeLineType', 0)->plaintext);
 			$eventType = strtoupper(str_replace(" MEETING", "", strtoupper($eventType)));
 			$eventType = strtoupper(str_replace(" EVENT", "", strtoupper($eventType)));
			$eventId     = trim(get_string_between($event->find('a',0)->onclick, 'programme', ")")); 
			$eventId = strtoupper(str_replace("&#39;", "", $eventId));
			$eventTitle  = trim($event->find('div.programmeLineContent', 0)->plaintext);
			$shortDescr  = trim($event->find('div.programmeLineText', 0)->find('p',0));
			
			echo "<br>" .  $eventTitle . "<br>";
			
			$shortDescrLink  = extractShortLinkInfo($event->find('div.programmeLineText', 0)); 
	
			if($shortDescr==""){
				$shortDescr  = trim($event->find('div.programmeLineText', 0)->innertext);
			}
			$shortDescr= str_replace("More on this session", "", $shortDescr);

			//$shortDescrLink = 'https://sustainabledevelopment.un.org//index.php?page=view&type=20000&nr=2192&menu=2993#panelbio2321';
 			$shortDescrLink = str_replace("\\", "", $shortDescrLink);
			$shortDescrLink = str_replace("amp;", "", $shortDescrLink);
			echo "<br>".$shortDescrLink;
			
			$html2 = file_get_html($shortDescrLink);
			$dateInfo = extractDateInfo($html2);
			$biography = extractBiographyInfo($html2,$eventId);
			$webcast = extractWebcastInfo($html2);
			$statement = extractstatementInfo($html2);			
			$descr = $html2->find('div[class=wrap]',0);
			$descr->find('div[class=floatRight_300]',0)->innertext='';
			/*		
			$descr = '';$biography = '';$webcast = '';$statement = '' ; $dateInfo = '';			
			*/	
			
			//$biographiesjsonData =  json_encode($biography, JSON_PRETTY_PRINT);			
			//echo str_replace("\n", "<br>", $biographiesjsonData);
			//$webcastjsonData =  json_encode($webcast, JSON_PRETTY_PRINT);			
			//echo str_replace("\n", "<br>", $webcastjsonData);
			//$statementjsonData =  json_encode($statement, JSON_PRETTY_PRINT);			
			//echo str_replace("\n", "<br>", $statementjsonData);
			
			//$jsonData =  json_encode($data, JSON_PRETTY_PRINT);
			//echo str_replace("\n", "<br>", $jsonData);
			
			
			$shortDescr = preg_replace("/\n/m", '\n', $shortDescr);
			$descr = preg_replace("/\n/m", '\n', $descr);
			
			$events = array(
				"eventId" => $eventId,
				"eventTitle" => $eventTitle,
				"location" => $location,				
				"time" => $time,
				"date" => $dateInfo,
				"eventType" => $eventType,
				"shortDescrLink" => $shortDescrLink,
				"biographies" => $biography,
				"webcasts" => $webcast,
				"statements" => $statement,
				"shortDescr" => utf8_encode($shortDescr),
				"descr" => utf8_encode($descr)
				
			);
			
			if($eventDt != $preDate && $skipFirst==1){
				echo "resetting second date" . $preDate;
				$eventDates[] =  array(
					"dateTitle" => strtoupper(date('d M',strtotime($preDate))),
					"dayTitle" => strtoupper(date('D',strtotime($preDate))),
					"date" => date('d M Y',strtotime($preDate)) ,
					"events" => $hlpfEventsInfo
				);

				if($splitupEnabled==1){					
					$eventDatesDate[] =  array(
						"dateTitle" => strtoupper(date('d M',strtotime($preDate))),
						"dayTitle" => strtoupper(date('D',strtotime($preDate))),
						"date" => date('d M Y',strtotime($preDate)) ,
						"events" => $hlpfEventsInfo
					);
					$eventsInfoDate =  array(
						"eventName" => 'HIGH-LEVEL POLITICAL FORUM 2018',
						"description" => "The meeting of the high-level political forum on sustainable development in 2017 convened under the auspices of the Economic and Social Council, was held from Monday, 10 July, to Wednesday, 19 July 2017; including the three-day ministerial meeting of the forum from Monday, 17 July, to Wednesday, 19 July 2017. The theme was \"Eradicating poverty and promoting prosperity in a changing world\". The set of goals to be reviewed in depth was the following, including Goal 17. Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development, that will be considered each year: \nGoal 1. End poverty in all its forms everywhere \nGoal 2. End hunger, achieve food security and improved nutrition and promote sustainable agriculture\nGoal 3. Ensure healthy lives and promote well-being for all at all ages\nGoal 5. Achieve gender equality and empower all women and girls\nGoal 9. Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation\nGoal 14. Conserve and sustainably use the oceans, seas and marine resources for sustainable development\nIn accordance with paragraph 84. of the 2030 Agenda, Member States have decided that the HLPF shall carry out regular voluntary reviews of the 2030 Agenda which will include developed and developing countries as well as relevant UN entities and other stakeholders. The reviews were state-led, involving ministerial and other relevant high-level participants, and provide a platform for partnerships, including through the participation of major groups and other relevant stakeholders. In 2017, 43 countries have volunteered to present their national voluntary reviews to the HLPF. For more details, please click here.",
						"eventDates" => $eventDatesDate
					);					
					$dataDate['eventsInfo'] = $eventsInfoDate;

					$jsonDataDate =  json_encode($dataDate , JSON_PRETTY_PRINT);
					$jsonDataDate =  str_replace("\/", "/", $jsonDataDate);				
					$myfile = fopen("D:\wamp64\www\ContentExtractor\Final_code_un_scrape\Event-". $preDate .".js", "w") or die("Unable to open file!");
					$jsonDataDate =  "var hlpfevents = " . $jsonDataDate;
					$jsonDataDate .= "; " ;				
					fwrite($myfile, $jsonDataDate);
					fclose($myfile);
				}
				
				unset($hlpfEventsInfo);
				//echo "<br>count of hlpfEventsInfo" . count($hlpfEventsInfo);
				//echo "<br>count of events" . count($events);

				$hlpfEventsInfo[] =  $events ;
				$preDate = $eventDt ;			

			}else{
				$skipFirst=1;
				// $hlpfevents = $events;
				$preDate = $eventDt ;			
				$hlpfEventsInfo[] =  $events ;
			}
			//echo "<br>events length : " . count($events);			
		}
			$eventDates[] =  array(
				"dateTitle" => strtoupper(date('d M',strtotime($preDate))),
				"dayTitle" => strtoupper(date('D',strtotime($preDate))),
				"date" => date('d M Y',strtotime($preDate)) ,
				"events" => $hlpfEventsInfo
			);
		
				
			$eventsInfo =  array(
				"eventName" => 'HIGH-LEVEL POLITICAL FORUM 2018',
				"description" => "The meeting of the high-level political forum on sustainable development in 2017 convened under the auspices of the Economic and Social Council, was held from Monday, 10 July, to Wednesday, 19 July 2017; including the three-day ministerial meeting of the forum from Monday, 17 July, to Wednesday, 19 July 2017. The theme was \"Eradicating poverty and promoting prosperity in a changing world\". The set of goals to be reviewed in depth was the following, including Goal 17. Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development, that will be considered each year: \nGoal 1. End poverty in all its forms everywhere \nGoal 2. End hunger, achieve food security and improved nutrition and promote sustainable agriculture\nGoal 3. Ensure healthy lives and promote well-being for all at all ages\nGoal 5. Achieve gender equality and empower all women and girls\nGoal 9. Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation\nGoal 14. Conserve and sustainably use the oceans, seas and marine resources for sustainable development\nIn accordance with paragraph 84. of the 2030 Agenda, Member States have decided that the HLPF shall carry out regular voluntary reviews of the 2030 Agenda which will include developed and developing countries as well as relevant UN entities and other stakeholders. The reviews were state-led, involving ministerial and other relevant high-level participants, and provide a platform for partnerships, including through the participation of major groups and other relevant stakeholders. In 2017, 43 countries have volunteered to present their national voluntary reviews to the HLPF. For more details, please click here.",
				"eventDates" => $eventDates
			);
			
			
			copy('exhibition.js', 'data.js');

			$data['eventsInfo'] = $eventsInfo;
			try {
				$jsonData =  json_encode($data , JSON_PRETTY_PRINT);
				$jsonData =  str_replace("\/", "/", $jsonData);				
				//echo str_replace("\n", "<br>", $jsonData);								
				$myfile = fopen("D:\wamp64\www\ContentExtractor\Final_code_un_scrape\data.js", "a") or die("Unable to open file!");
				$jsonData = "\n" . "var hlpfevents = " . $jsonData;
				$jsonData .= "; " . "\n";				
				fwrite($myfile, $jsonData);
				fclose($myfile);
			}
			catch(Exception $e) {
				echo 'Error: JSON CONVERSION Extraction: ' .$e->getMessage();
			}			
			
			foreach( $eventDates as $eventDatesVar ){
				//echo "<br> ==> ".$eventDatesVar["dateTitle"];				
				foreach( $eventDatesVar["events"] as $eventsVar ){
					//echo "<br> ==> ".$eventsVar["eventId"];
					foreach( $eventsVar['biographies'] as $biographiesVar ){
						//echo "<br> ==> ".$biographiesVar["biographyTitle"];
						
						/*
						if (in_array($biographiesVar["biographyId"],$biographieSet, TRUE)){
							$biographieSet[ $biographiesVar["biographyId"] ]["eventId"][]= $biographiesVar["eventId"];
						}else{
							unset($bioEvent);
							$bioEvent[] = $biographiesVar["eventId"];
							
							$biographieSet[ $biographiesVar["biographyId"] ] = array(
								"panelistId" => $biographiesVar["biographyId"],
								"biographyTitle" => $biographiesVar["biographyTitle"],
								"biographySubTitle" => $biographiesVar["biographySubTitle"],
								"photo" => $biographiesVar["photo"],
								"eventIds" => $bioEvent
							);
						}
						*/

						if (in_array($biographiesVar["biographyId"],$biographieSet, TRUE)){
							$biographieSet[ $biographiesVar["biographyId"] ]["eventId"][]= $biographiesVar["eventId"];
						}else{
							unset($bioEvent);
							$bioEvent[] = $biographiesVar["eventId"];
							
							$biographieSet[ $biographiesVar["biographyId"] ] = array(
								"panelistId" => $biographiesVar["biographyId"],
								"biographyTitle" => $biographiesVar["biographyTitle"],
								"biographySubTitle" => $biographiesVar["biographySubTitle"],
								"photo" => $biographiesVar["photo"],
								"eventIds" => $bioEvent
							);
						}						
					}
				}		
			}

			$biographieRealSet = array();
			
			foreach( $biographieSet as $biographieID ){
				echo "<br> ==*****> ".$biographieID["biographyTitle"];
				
					$biographieRealSet["panelists"][] = array(
						"panelistId" => $biographieID["panelistId"],
						"biographyTitle" => $biographieID["biographyTitle"],
						"biographySubTitle" => $biographieID["biographySubTitle"],
						"photo" => $biographieID["photo"],
						"eventIds" =>$biographieID["eventIds"]
					);

			}
			// BioGraphy Printing
			try {
				$biojsonData =  json_encode($biographieRealSet , JSON_PRETTY_PRINT);
				$biojsonData =  str_replace("\/", "/", $biojsonData);				
				echo str_replace("\n", "<br>", $biojsonData);								
				$myfile = fopen("D:\wamp64\www\ContentExtractor\Final_code_un_scrape\data.js", "a") or die("Unable to open file!");
				$biojsonData = "var panelistevents = " . $biojsonData;
				$biojsonData .= ";";				
				fwrite($myfile, $biojsonData);
				fclose($myfile);
			}
			catch(Exception $e) {
				echo 'Error: JSON CONVERSION Extraction: ' .$e->getMessage();
			}	
			
			
			
}
catch(Exception $e) {
  echo 'Error in Processing Section: ' .$e->getMessage();
}

			
			
function extractLocationInfo($timeLocation) {	
	try {
			foreach( $timeLocation->children() as $i => $unwantedTags ) {
				echo ""; 
				$location = trim($unwantedTags->innertext);
				$unwantedTags->outertext = '';
			}
	}
	//catch exception
	catch(Exception $e) {
		echo 'Error: Location Extraction: ' .$e->getMessage();
	}
	echo $location;
	return trim(utf8_encode($location));
	// return trim("asdf");
}


function extractShortLinkInfo($html2) {	

	//$event->find('div.programmeLineText', 0)->find('a',0)->href));
	try {
		$dateValue='';
		foreach($html2->find('a') as $linkReference){		
			if (strpos($linkReference->innertext, 'More on this') !== false) {		
				$urlValue= $linkReference->href;
				break;
			}
		}
	}
	//catch exception
	catch(Exception $e) {
		echo 'Error: Date Extraction: ' .$e->getMessage();
	}

	return html_entity_decode(trim($urlValue));
}
function extractDateInfo($html2) {	
	try {
		$dateValue='';
		foreach($html2->find('div[class=mediumWhite]') as $statement){		
			if (strpos($statement->innertext, 'day') !== false) {		
				$dateValue= $statement->innertext;
				break;
			}
		}
	}
	//catch exception
	catch(Exception $e) {
		echo 'Error: Date Extraction: ' .$e->getMessage();
	}

	return trim($dateValue);
}
function extractstatementInfo($html2) {	
		

		$stCount=0;
		foreach($html2->find('div[class=mediumWhite]') as $statement){
			if ( $statement->innertext == 'Statements' && $stCount==0) {
				$stCount++;
				$statementContents = $statement->parent();
				foreach($statementContents->find('a') as $statementURL){
						$statementLink =  $statementURL->href ; 
						$statementTitle =  $statementURL->innertext;
						$statementDescr = "";
						
						$statementLink = str_replace("\\", "", $statementLink);
						$statementLink = str_replace("amp;", "", $statementLink);
						
						$statements[] = array(
							"statementTitle" => utf8_encode($statementTitle),
							"statementSubTitle" => utf8_encode($statementDescr),
							"statementLink" => html_entity_decode("https://sustainabledevelopment.un.org/" . $statementLink)
						);					
				}
				
				 //$statementjsonData =  json_encode($statements, JSON_PRETTY_PRINT);

			}
			
		}
		if(isset($statements)){
			return $statements;
		}else{
			return array();
		}
		

}
function extractWebcastInfo($html2) {

		foreach($html2->find('div[class=mediumWhite]') as $webcast){
			//echo "========>".$webcast->innertext ."<br>";
			if ( $webcast->innertext == 'Webcast') {
				$webcastContents = $webcast->parent();
				//echo $webcastContents;
				foreach($webcastContents->find('a') as $webcastURL){
					if ( $webcastURL->class == 'video_related_line_link') {
						//echo $webcastURL->innertext."<br>==";
						$webcastDescr = $webcastURL->innertext;
						$webcastLink =  $webcastURL->href ; 
						$webcastTitle =  $webcastURL->innertext;
						$webcastLink = str_replace("\\", "", $webcastLink);
						$webcastLink = str_replace("amp;", "", $webcastLink);

						$webcasts[] = array(
							"webcastTitle" => utf8_encode($webcastTitle),
							"webcastDescr" => utf8_encode($webcastDescr),
							"webcastLink" => html_entity_decode("https://sustainabledevelopment.un.org/" . $webcastLink)
						);					
					}
				}
				
				 //$webcastjsonData =  json_encode($webcasts, JSON_PRETTY_PRINT);
			}
			
		}
		
		if(isset($webcasts)){
			return $webcasts;
		}else{
			return array();
		}

}
function extractBiographyInfo($html2,$eventId) {	
		//echo $html2; 
		//global $biographieSet;
		foreach($html2->find('div[class=mediumWhite]') as $bioGraphy){
			if (substr( $bioGraphy->parent()->id, 0, 8) == 'panelbio') {
				$bioGraphyContents = $bioGraphy->parent();				
				$bioGraphyStyle = $bioGraphyContents->find('div',0)->style ; 
				$bioGraphyImage = trim(get_string_between( $bioGraphyStyle , "url('", "'"));
				
				$bioGraphyId = substr( $bioGraphy->parent()->id, 8) ;
				$bioGraphyName = $bioGraphy->plaintext ;
				$bioGraphyImage = html_entity_decode("https://sustainabledevelopment.un.org". $bioGraphyImage );
				$bioGraphyTitle = $bioGraphyContents->find('b',0)->plaintext ; 				
				
				$biographies[] = array(
					"biographyId" => utf8_encode($bioGraphyId),
					"biographyTitle" => utf8_encode($bioGraphyName),
					"biographySubTitle" => utf8_encode($bioGraphyTitle),
					"photo" => utf8_encode($bioGraphyImage),
					"eventId" => $eventId
				);
				
				//$biographieSet[$bioGraphyId]['eventIds'][] = $eventId;
				//echo "<br> ===>  " . json_encode($biographieSet , JSON_PRETTY_PRINT) . "<br>";

				/*
				panelistId: '01',
				biographyTitle: 'Mr. Robert Johnson',
				biographySubTitle: 'President of the Institute for New Economic Thinking',
				photo:  ' https://sustainabledevelopment.un.org/content/images/imageurl20001_2321.jpg',							
				eventIds: [	'1' ],
				*/
				//$biographiesjsonData =  json_encode($biographies, JSON_PRETTY_PRINT);
			}
			
		}
		
		if(isset($biographies)){
			return $biographies;
		}else{
			return array();
		}

}
	
function get_string_between($string, $start, $end){
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}


?>