var casper = require('casper').create();

casper.start('http://localhost:3000/', function() {
  this.echo('yo');            
  this.echo(this.getHTML());            
});

casper.thenOpen('http://localhost:3000/#create', function() {
  this.evaluate(function() {
    window.React.render();
  });
  this.echo('hi');
  this.echo(this.getHTML());
});

casper.run();
