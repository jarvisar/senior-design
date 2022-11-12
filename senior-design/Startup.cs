using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(senior_design.Startup))]
namespace senior_design
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
