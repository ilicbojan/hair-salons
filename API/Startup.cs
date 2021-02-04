using API.Common;
using API.Services;
using Application;
using Application.Common.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // add services from inftastructure and application project
            services.AddApplication();
            services.AddInfrastructure(Configuration);

            // configuration for get current user
            services.AddScoped<ICurrentUserService, CurrentUserService>();

            //! ??? CHECK
            services.AddHttpContextAccessor();

            // add CORS, cross origin, allowing client-app to communicate with API
            services.AddCors(options =>
              {
                  options.AddPolicy("CorsPolicy", policy =>
                  {
                      policy
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .WithOrigins("http://localhost:3000",
                                       "http://localhost:3001")
                          .AllowCredentials();
                  });
              });

            services.AddControllers(options =>
            {
                // adding authorize for all controllers
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddNewtonsoftJson();

            // !!! CHECK
            // Customise default API behaviour
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });


            // Register the Swagger generator
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Hair Salons API", Version = "v1", });
                c.CustomSchemaIds(x => x.FullName);
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Enable middleware to serve generated Swagger as a JSON endpint
                app.UseSwagger();

                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("v1/swagger.json", "My API V1");
                });
            }

            app.UseCustomExceptionHandler();

            // ! vratiti za production
            // app.UseHttpsRedirection();

            // TODO: Security Headers - uncomment this in production
            // app.UseXContentTypeOptions();
            // app.UseReferrerPolicy(opt => opt.NoReferrer());
            // app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            // app.UseXfo(opt => opt.Deny());
            // app.UseRedirectValidation();
            // app.UseCsp(opt => opt
            //     .BlockAllMixedContent()
            //     .StyleSources(s => s.Self().CustomSources("https://fonts.googleapis.com", "sha256-F4GpCPyRepgP5znjMD8sc7PEjzet5Eef4r09dEGPpTs="))
            //     .StyleSources(s => s.UnsafeInline())
            //     .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com"))
            //     .FormActions(s => s.Self())
            //     .FrameAncestors(s => s.Self())
            //     .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com", "blob:", "data:"))
            //     .ScriptSources(s => s.Self().CustomSources("sha256-ma5XxS1EBgt17N22Qq31rOxxRWRfzUTQS1KOtfYwuNo="))
            //   );

            

            // TODO: Static Files -  for wwwroot, uncomment this in production
            // app.UseDefaultFiles();
            // app.UseStaticFiles()

            app.UseRouting();
            // add CORS, cross origin, allowing client-app to communicate with API
            app.UseCors("CorsPolicy");

            // add authentication for Identity
            app.UseAuthentication();
            app.UseAuthorization();

            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                // TODO:  static files, index.html from react app, create Fallback controller
                //endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
