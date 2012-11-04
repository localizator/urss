/*#########################################################################
#                                                                         #
#   Simple script for testing the scriptable service browser              #
#   by creating a simple static browser with some cool radio              #
#   streams.                                                              #
#                                                                         #
#                                                                         #
#                                                                         #
#   (C) 2012 Ivan Petruk  localizator@ukr.net                             #
#   								                                      #    
#   						                                              #
#   							                                          #
#                                                                         #
#   This program is free software; you can redistribute it and/or modify  #
#   it under the terms of the GNU General Public License as published by  #
#   the Free Software Foundation; either version 2 of the License, or     #
#   (at your option) any later version.                                   #
#                                                                         #
#   This program is distributed in the hope that it will be useful,       #
#   but WITHOUT ANY WARRANTY; without even the implied warranty of        #
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         #
#   GNU General Public License for more details.                          #
#                                                                         #
#   You should have received a copy of the GNU General Public License     #
#   along with this program; if not, write to the                         #
#   Free Software Foundation, Inc.,                                       #
#   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.         #
##########################################################################*/

Importer.loadQtBinding("qt.core");
Importer.loadQtBinding("qt.gui");

function Station( name, url, description )
{
    this.name = name;
    this.url = url;
    this.description = description;
}

categories = new Object;

categories["KISS FM 2.0"]=new Array (
new Station( "KISS FM 2.0 (128кбіт/с)",
             "http://stream.kissfm.ua:8000/KISSFM-2.0")
);

categories["KISS FM Україна"]=new Array (
new Station( "KISS FM Україна (48кбіт/с)",
             "http://stream.kissfm.ua:8000/kissACC"),
new Station( "KISS FM Україна (96кбіт/с)",
             "http://stream.kissfm.ua:8000/kissVorbis"),
new Station( "KISS FM Україна (128кбіт/с)",
             "http://stream.kissfm.ua:8000/kiss")
);

categories["DJ FM Україна"]=new Array (
new Station( "DJ FM Україна (64кбіт/с)",
             "http://media.brg.ua:8008/;stream.nsv"),
new Station( "DJ FM Україна (128кбіт/с)",
             "http://media.brg.ua:8010/;stream.nsv")
);

categories["MiX FM"]=new Array (
new Station( "MiX FM (24кбіт/с)",
             "http://mixfm.com.ua:8000/"),
new Station( "MiX FM (128кбіт/с)",
             "http://mixfm.com.ua:8128/"),
new Station( "MiX FM (192кбіт/с)",
             "http://mixfm.com.ua:8192/")
);

categories["UAFM"]=new Array (
new Station( "UAFM (128кбіт/с)",
	     "http://live.uafm.km.ua:9001/uafm")
);

categories["Радіо Мікс"]=new Array (
new Station( "Радіо Мікс (48кбіт/с)",
             "http://media.fregat.com:8000/RadioMIX-low"),
new Station( "Радіо Мікс (128кбіт/с)",
             "http://media.fregat.com:8000/RadioMIX")
);

categories["MFM"]=new Array (
new Station( "MFM (32кбіт/с)",
	     "http://radio.urg.ua:80/online32"),
new Station( "MFM (48кбіт/с)",
	     "http://radio.urg.ua:80/onlineacc"),
new Station( "MFM (128кбіт/с)",
	     "http://radio.urg.ua:80/online128")
);

categories["Є! Радіо"]=new Array (
new Station( "Є! Радіо (64кбіт/с)",
             "http://etoradio.cc.colocall.com:8500/eradio_low"),
new Station( "Є! Радіо (128кбіт/с)",
             "http://62.149.13.129:8500/eradio_hi")
);

categories["Люкс ФМ"]=new Array (
new Station( "Люкс ФМ (48кбіт/с)",
             "http://91.220.161.56:8090/"),
new Station( "Люкс ФМ (96кбіт/с)",
             "http://91.220.161.56:8088/")
);

categories["Хіт ФМ"]=new Array (
new Station( "Хіт ФМ (32кбіт/с)",
             "http://online-hitfm.tavrmedia.ua/HitFM_32"),
new Station( "Хіт ФМ (128кбіт/с)",
             "http://online-hitfm.tavrmedia.ua/HitFM")
);

categories["Стильне радіо / Перець ФМ"]=new Array (
new Station( "Стильне радіо (48кбіт/с)",
             "http://adamant2.perec.fm:80/radio-stilnoe48k"),
new Station( "Стильне радіо (128кбіт/с)",
             "http://adamant2.perec.fm:80/radio-stilnoe")
);

images = new Object;
images["KISS FM Україна"]="kissfm.png";
images["Хіт ФМ"]="hitfm.png";
images["Люкс ФМ"]="lux.png";

function URSS()
{
    Amarok.debug( "" );
    ScriptableServiceScript.call( this, "Українські радіостанції", 2,
      "Слухай Українське!", 
      "Радіостанції", 
      true);
    Amarok.debug( "done." );
}

function onConfigure()
{
    Amarok.alert( "Скрипт не потребує налаштування." );
  
} 

function onPopulating( level, callbackData, filter )
{
    if ( level == 1 ) 
    {
        for( att in categories )
        {
            var cover = Amarok.Info.scriptPath() + "/" + images[att];
            Amarok.debug ("att: " + att + ", " + categories[att].name);
      
            item = Amarok.StreamItem;
	    item.level = 1;
	    item.callbackData = att;
	    item.itemName = att;
	    item.playableUrl = "";
	    item.infoHtml = "";
            item.coverUrl = cover;
	    script.insertItem( item );

        }
        script.donePopulating();

    }
    else if ( level == 0 ) 
    {
        Amarok.debug( "Пошук радіостанції ..." );
	//add the station streams as leaf nodes

        var stationArray = categories[callbackData];

	for ( i = 0; i < stationArray.length; i++ )
	{
                var cover = Amarok.Info.scriptPath() + "/" + images[callbackData];
		item = Amarok.StreamItem;
		item.level = 0;
		item.callbackData = "";
		item.itemName = stationArray[i].name;
		item.playableUrl = stationArray[i].url;
		item.album = callbackData;
		item.infoHtml = stationArray[i].description;
                item.artist = "Українські радіостанції";
                item.coverUrl = cover;
		script.insertItem( item );
	}
	script.donePopulating();
    }
}

function onCustomize() {
    var currentDir = Amarok.Info.scriptPath() + "/";
    var iconPixmap = new QPixmap(currentDir+"icon.png");
    script.setIcon(iconPixmap);
}

Amarok.configured.connect( onConfigure );

script = new URSS();
script.populate.connect( onPopulating );
script.customize.connect( onCustomize );