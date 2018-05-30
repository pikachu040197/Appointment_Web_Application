use DBI;
use strict;

use CGI qw(:standard);

my $dbh = DBI->connect('dbi:SQLite:dbname=appointment.db','','') or die $DBI::errstr;

my $sql = 'INSERT INTO appointment(date,time,description) VALUES(?,?,?)';
my $sth = $dbh->prepare($sql);
$sth->execute(param('date'),param('time'),param('description')) or die $DBI::errstr;

$sth->finish();
$dbh->disconnect();

print "Location: http://localhost:8080/appointment\n";
print "Content-type: text/html";
