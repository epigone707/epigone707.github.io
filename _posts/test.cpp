#include <iostream>

using namespace std;

class base {
   public:
    base() { cout << "Constructing base\n"; }
    virtual ~base() { cout << "Destructing base\n"; }
};

class derived : public base {
   public:
    derived() { cout << "Constructing derived\n"; }
    virtual ~derived() { cout << "Destructing derived\n"; }
};

int main() {
    derived *d = new derived();  // output: Constructing base
                                 //         Constructing derived
    base *b = d;
    delete b;  // output: Destructing derived
               //         Destructing base
    return 0;
}