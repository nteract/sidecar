set -euo pipefail

wget http://download.zeromq.org/zeromq-3.2.5.tar.gz
echo "1069213fb62c01c971959d7fce8375a9520c0f74  zeromq-3.2.5.tar.gz" > sha1sums
sha1sum -c sha1sums

tar -xf zeromq-3.2.5.tar.gz
cd zeromq-3.2.5
./configure --prefix=$(readlink -f ..)
make && make install
export CXXFLAGS="-I $(readlink -f ../include)"
export LDFLAGS="-L $(readlink -f ../lib) -Wl,-rpath=$(readlink -f ../lib)"
