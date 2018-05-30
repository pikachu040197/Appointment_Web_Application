use DBI;
use strict;

use CGI qw(:standard);
use JSON;
print header('application/json');

my $dbh = DBI->connect('dbi:SQLite:dbname=appointment.db','','') or die $DBI::errstr;

my $str = param('searchValue');
my $sql = 'SELECT * FROM appointment WHERE UPPER(description) LIKE UPPER(?)';

my $sth = $dbh->prepare($sql);
$sth->execute("%$str%") or die $DBI::errstr;

my $data_json = [];
while (my @row = $sth->fetchrow_array()) {
	 push @{$data_json},{'date'=>$row[0],'time'=>$row[1],'description'=>$row[2]};
}

$sth->finish();
$dbh->disconnect();

my $json_object = to_json($data_json, {utf8 => 1, pretty => 1});
print $json_object;
